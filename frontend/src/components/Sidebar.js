import React from 'react';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
        {/* Future links for analytics, users, settings, etc */}
      </ul>
    </nav>
  );
}
