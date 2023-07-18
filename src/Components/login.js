import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequestBlockPage from './RequestBlocks';
import AcceptancePage from './AcceptRequestPage';
//import ExcelLikeGrid from './ExcelLikeGrid';
import TablePage from './TablePage';
import NavBar from './navbar';
import SummaryPage from './Summary';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS

const Dashboard = ({ user, handleLogout }) => {
  return (
    
      <div className="container">
        <NavBar user={user} />
        <div className="content">
          <h2>Welcome, {user.email}!</h2>
            <Routes>
              <Route path="/dashboard*" element={<h3>Dashboard Content</h3>} />
              <Route path="/request-block" element={<RequestBlockPage />} />
              <Route path="/accept" element={<AcceptancePage role={user.role} />} />
              {user.role === 'admin' && <Route path="/table" element={<TablePage />} />}
              <Route path="/summary" element={<SummaryPage />} />
            </Routes>
          <button className="button is-danger" onClick={handleLogout}>Logout</button>
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
      const response = await fetch('https://350b-2401-4900-4e1a-dde-85fe-6d20-2674-2f88.ngrok-free.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful
        const result = await response.json();
        setUser({email: result.data.email, role: result.data.role}); // Assuming that the response contains an 'email' field.
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
      <form className="box is-centered"  onSubmit={handleLogin}>
        <div className="field">
          <label className="label">
            Email
          </label>
            <p className="control">
              <input
                className="input is-rounded"
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
        </div>

        <div className="field" >
          <label className="label">
            Password
            </label>
          <p className="control">
            <input
              className="input is-rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
        </div>

        <div className="buttons">
        <button className="button is-light is-primary " type="submit">Login</button>
        </div>
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
