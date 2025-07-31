const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ message: 'Token Expired' });
    return res.status(401).json({ message: 'Invalid Token' });
  }
}

// GET analytics
router.get('/', verifyToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = req.query.filter || '';
  const offset = (page - 1) * limit;

  try {
    const [data] = await db.query(
      `SELECT * FROM analytics WHERE title LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [`%${filter}%`, limit, offset]
    );

    const [countResult] = await db.query(
      `SELECT COUNT(*) AS total FROM analytics WHERE title LIKE ?`,
      [`%${filter}%`]
    );

    res.json({
      data,
      total: countResult[0].total,
      currentPage: page,
      totalPages: Math.ceil(countResult[0].total / limit),
    });
  } catch (err) {
    console.error('Error fetching analytics data:', err.message);
    res.status(500).json({ message: 'Server Error: Unable to fetch data' });
  }
});

// POST new analytics
router.post('/analytics', verifyToken, async (req, res) => {
  const { title, value } = req.body;
  if (!title || typeof value !== 'number') {
    return res.status(400).json({ message: 'Title and numeric value are required' });
  }

  try {
    await db.query('INSERT INTO analytics (title, value) VALUES (?, ?)', [title, value]);
    res.status(201).json({ message: 'Analytics data added' });
  } catch (err) {
    console.error('Error adding analytics data:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
