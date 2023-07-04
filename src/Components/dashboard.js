import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import RequestBlockPage from './RequestBlocks';
import AcceptancePage from './AcceptRequestPage';
import TablePage from './TablePage';

const Dashboard = ({ user, setUser }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="menu-item">
            <div onClick={toggleSubMenu} className="menu-item-header">
              Blocks
              <i className={`arrow ${showSubMenu ? 'up' : 'down'}`} />
            </div>
            {showSubMenu && (
              <ul className="submenu">
                <li className="submenu-item">
                  <Link to="/request-block">Request Block</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/accept">Accept</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/table">Table</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className="content">
        <h2>Welcome, {user}!</h2>
        <Routes>
          <Route path="/dashboard" element={<h3>Dashboard Content</h3>} />
          <Route path="/request-block" element={<RequestBlockPage />} />
          <Route path="/accept" element={<AcceptancePage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
