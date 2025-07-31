import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header className="header">
      <h1>Admin Dashboard</h1>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </header>
  );
}
