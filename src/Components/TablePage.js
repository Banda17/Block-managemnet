import React from 'react';
import { Link } from 'react-router-dom';
import SummaryPage from './Summary';
import AcceptancePage from './AcceptRequestPage';

const TablePage = () => {
  return (
    <div>
      <Link to="/dashboard">Back to Dashboard</Link>
      <SummaryPage />
    </div>
  );
};

export default TablePage;
