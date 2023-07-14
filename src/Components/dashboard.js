import React, { useState} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import RequestBlockPage from './RequestBlocks';
//import ExcelLikeGrid from './ExcelLikeGrid';
import AcceptancePage from './AcceptRequestPage';
import TablePage from './TablePage';
import SummaryPage from './Summary';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS

const Dashboard = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <div className="tabs is-toggle is-fullwidth">
        <ul>
          <li>
            <Link className="is-active" to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/request-block">
              <span>Request Block</span>
            </Link>
          </li>
          <li>
            <Link to="/accept">
              <span>Accept</span>
            </Link>
          </li>
          <li>
            <Link to="/table">
              <span>Table</span>
            </Link>
          </li>
          <li>
            <Link to="/summary">
              <span>Summary</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="content">
        {
          <h2>Welcome, {user}!</h2>
        }
        <Routes>
          <Route path="/dashboard" element={<h3>Dashboard Content</h3>} />
          <Route path="/request-block" element={<RequestBlockPage />} />
          <Route path="/accept" element={<AcceptancePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
        <button onClick={handleLogout} className="button is-danger">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
