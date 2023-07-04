import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import RequestBlockPage from './RequestBlocks';
import AcceptancePage from './AcceptRequestPage';
import TablePage from './TablePage';

const Dashboard = ({ user, handleLogout }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

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
        <h2>Welcome, {user.email}!</h2>
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

const Login = ({ setUser, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend server to perform authentication
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful
        const user = await response.json();
        setUser(user);
        setLoggedIn(true);
      } else {
        // Authentication failed
        console.log('Authentication failed');
      }
    } catch (error) {
      console.log('Error during authentication:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <Dashboard user={user} handleLogout={handleLogout} />
      ) : (
        <Login setUser={setUser} setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
};

export default LoginForm;
