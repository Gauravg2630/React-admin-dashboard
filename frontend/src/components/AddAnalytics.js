import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AddAnalytics() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!title || !value) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/data/analytics',
        { title, value: Number(value) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage('Analytics data added successfully');
      setTitle('');
      setValue('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding data');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button type="submit">Add Analytics Data</button>
      {message && <p>{message}</p>}
    </form>
  );
}
