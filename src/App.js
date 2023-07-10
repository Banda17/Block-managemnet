import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/login';
import Dashboard from './Components/dashboard';
import TablePage from './Components/TablePage';
import RequestBlockPage from './Components/RequestBlocks';
import AcceptRequestPage from './Components/AcceptRequestPage';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/request-block" element={<RequestBlockPage />} />
          <Route path="/accept" element={<AcceptRequestPage />} />
          <Route path="/" element={<Login setUser={setUser} />} />
        </Routes>

        {user && (
          <div>
            <ul>
              <li className="menu-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="menu-item">
                <Link to="/request-block">Request Block</Link>
              </li>
              <li className="menu-item">
                <Link to="/accept">Accept</Link>
              </li>
              <li className="menu-item">
                <Link to="/table">Table</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
