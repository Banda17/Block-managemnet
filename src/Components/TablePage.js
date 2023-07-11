import React from 'react';
import { Link } from 'react-router-dom';
import AcceptancePage from './AcceptRequestPage';

const TablePage = () => {
  return (
    <div>
      <Link to="/dashboard">Back to Dashboard</Link>
      <AcceptancePage />
    </div>
  );
};

export default TablePage;
