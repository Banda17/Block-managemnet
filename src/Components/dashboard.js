import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className="content">
        <h2>Welcome, {user}!</h2>
        <p>This is your dashboard.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
