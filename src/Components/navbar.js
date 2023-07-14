import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <div className="tabs is-boxed is-fullwidth">
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
          <Link to="/table" className={user.role !== 'admin' ? 'is-disabled' : ''}>
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
  );
};

export default NavBar;
