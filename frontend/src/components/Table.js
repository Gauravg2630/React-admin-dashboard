import React from 'react';

export default function Table({ data }) {
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <table className="analytics-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Value</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.value}</td>
            <td>{new Date(item.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
