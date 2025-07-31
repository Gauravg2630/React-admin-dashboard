import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Table from './Table';
import AddAnalytics from './AddAnalytics';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/data', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setAnalytics(res.data.data);  // Note: res.data.data contains the array
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchAnalytics();
    }
  }, [user?.token]);

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div className="dashboard" id="dashboard">
      <h2>Analytics Overview</h2>
      <AddAnalytics />
      <Table data={analytics} />
    </div>
  );
}
