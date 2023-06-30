import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  return (
    <div className="container">
      <h1>User Registration</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" className="form-control" id="username" name="username" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name="password" required />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role:</label>
          <select className="form-select" id="role" name="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="user2">User2</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
