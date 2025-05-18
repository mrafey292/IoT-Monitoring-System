import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DeviceDataProvider } from './context/DeviceDataContext';
import Dashboard from './components/Dashboard';
import AdminConsole from './components/AdminConsole';
import './App.css';

function App() {
  return (
    <DeviceDataProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>IoT Monitoring System</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin">Admin Console</Link>
                </li>
              </ul>
            </nav>
          </header>
          
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin" element={<AdminConsole />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} IoT Monitoring System - Muhammad Rafey</p>
          </footer>
        </div>
      </Router>
    </DeviceDataProvider>
  );
}

export default App;