import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/table"
            element={
              user && user.role === 'admin' ? (
                <TablePage user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/request-block"
            element={
              user && user.role === 'user' ? (
                <RequestBlockPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/accept"
            element={
              user && user.role === 'user' ? (
                <AcceptRequestPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
