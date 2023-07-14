import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/login';
import Dashboard from './Components/dashboard';
import TablePage from './Components/TablePage';
import RequestBlockPage from './Components/RequestBlocks';
//import ExcelLikeGrid from './Components/ExcelLikeGrid';
import AcceptRequestPage from './Components/AcceptRequestPage';
import SummaryPage from './Components/Summary';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="container">
        {user && (
          <div className="tabs is-fullwidth is-primary">
            <ul>
              <li>
                <Link to="/dashboard">
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
        )}
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/request-block" element={<RequestBlockPage />} />
          <Route path="/accept" element={<AcceptRequestPage />} />
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
