const db = require('../config/db');
const { Parser } = require('json2csv');

exports.getAllData = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM analytics ORDER BY created_at DESC');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

exports.exportDataToCSV = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM analytics');
    const json2csv = new Parser();
    const csv = json2csv.parse(data);

    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).end(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error exporting data' });
  }
};
