import React from 'react';

const TablePage = ({ user }) => {
  const tableData = [
    {
      id: 1,
      day: 'Monday',
      blockPeriod: 'Morning',
      blockTime: '9:00 AM - 12:00 PM',
      afterClearanceOf: 'XYZ',
      department: 'Department 1',
      sno: 1,
      typeOfWork: 'Type 1',
      quantumOfWork: 'Quantum 1',
      blockSection: 'Section 1',
      from: '8:00 AM',
      to: '1:00 PM',
      resources: 'Resource 1',
      supervisorDeputed: 'Supervisor 1',
      remarks: 'Remarks 1',
      trafficRepercussion: 'Repercussion 1',
      organisationDemanded: 'Organisation 1',
      demandedFrom: '9:00 AM',
      demandedTo: '11:00 AM',
      hrs: '2',
      blockBurst: 'Block Burst 1',
      progress: 'Progress 1',
      chg: 'CHG 1',
      goods: 'Goods 1',
      remarksForProgress: 'Remarks for Progress 1',
    },
    // Add more data objects as needed
  ];

  const renderTableHeader = () => {
    const headerColumns = [
      'Day',
      'Block Period',
      'Block Time',
      'After Clearance Of',
      'Department',
      'Sno',
      'Type of Work',
      'Quantum of Work',
      'Block Section',
      'From',
      'To',
      'Resources',
      'Supervisor Deputed',
      'Remarks',
      'Traffic Repercussion',
      'Organisation Demanded',
      'Demanded From',
      'Demanded To',
      'Hrs',
      'Block Burst',
      'Progress',
      'CHG',
      'Goods',
      'Remarks for Progress',
    ];

    return (
      <thead>
        <tr>
          {headerColumns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {tableData.map((data) => (
          <tr key={data.id}>
            <td>{data.day}</td>
            <td>{data.blockPeriod}</td>
            <td>{data.blockTime}</td>
            <td>{data.afterClearanceOf}</td>
            <td>{data.department}</td>
            <td>{data.sno}</td>
            <td>{data.typeOfWork}</td>
            <td>{data.quantumOfWork}</td>
            <td>{data.blockSection}</td>
            <td>{data.from}</td>
            <td>{data.to}</td>
            <td>{data.resources}</td>
            <td>{data.supervisorDeputed}</td>
            <td>{data.remarks}</td>
            <td>{data.trafficRepercussion}</td>
            <td>{data.organisationDemanded}</td>
            <td>{data.demandedFrom}</td>
            <td>{data.demandedTo}</td>
            <td>{data.hrs}</td>
            <td>{data.blockBurst}</td>
            <td>{data.progress}</td>
            <td>{data.chg}</td>
            <td>{data.goods}</td>
            <td>{data.remarksForProgress}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <h2>Table Page</h2>
      <table>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};

export default TablePage;
