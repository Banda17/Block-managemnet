import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Dashboard from './dashboard';

const Login = ({ setUser, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true); // Set isLoggedIn to true after successful login
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.log('Error during authentication:', error);
    }
  }, [email, password, setUser, setIsLoggedIn]);

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

const Register = ({ setUser, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('basic');

  const handleRegister = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        email,
        password,
        role,
      });

      if (response.status === 200) {
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true); // Set isLoggedIn to true after successful registration
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.log('Error during registration:', error);
    }
  }, [email, password, role, setUser, setIsLoggedIn]);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="basic">Basic</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const LoginForm = ({ setUser, setIsLoggedIn }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const setUserCallback = useCallback(
    (user) => {
      setUser(user);
    },
    [setUser]
  );

  if (setIsLoggedIn) {
    // Redirect to the dashboard or any other component after successful login
    return <Dashboard />;
  }

  return (
    <div>
      {isRegistering ? (
        <Register setUser={setUserCallback} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setUser={setUserCallback} setIsLoggedIn={setIsLoggedIn} />
      )}
      <p>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
