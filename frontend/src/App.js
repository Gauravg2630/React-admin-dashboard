import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-container">
      {user ? (
        <>
          <Header />
          <div className="main-content">
            <Sidebar />
            <Dashboard />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
