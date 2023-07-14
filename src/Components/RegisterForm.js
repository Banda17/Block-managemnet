import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend server to perform authentication
      const response = await axios.post('http://192.168.0.109:3001/login', {
        username,
        password,
      });

      if (response.status === 200) {
        // Authentication successful
        const user = response.data;
        setUser(user);
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
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

const Register = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('basic');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your backend server to perform registration
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
        role,
      });

      if (response.status === 200) {
        // Registration successful
        const user = response.data;
        setUser(user);
      } else {
        // Registration failed
        console.log('Registration failed');
      }
    } catch (error) {
      console.log('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            <option value="Engg">Engg</option>
            <option value="Trd">Trd</option>
            <option value="S&T">S&T</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const LoginForm = ({ setUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
      {isRegistering ? (
        <Register setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
      <p>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
