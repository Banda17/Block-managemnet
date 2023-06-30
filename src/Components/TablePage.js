import React from 'react';

const TablePage = ({ user }) => {
  const tableData = [
    {
      id: 1,
      Sno: 'Monday',
      Date: 'Morning',
      MajorSection: '9:00 AM - 12:00 PM',
      BlockStation_Station: 'XYZ',
      Direction: 'Department 1',
      Km: 1,
      Dept: 'Type 1',
      TypeofWork: 'Quantum 1',
      PlannedFrom: 'Section 1',
      PlannedTo: '8:00 AM',
      PlannedUnit: '1:00 PM',
      PlannedQuantity: 'Resource 1',
      Designation: 'Supervisor 1',
      TrafficRepercussion: 'Remarks 1',
      DemandedFrom: 'Repercussion 1',
      DemandedTo: 'Organisation 1',
      GrantedFrom: '9:00 AM',
      GrantedTo: '11:00 AM',
      AvailedFrom: '2',
      AvailedTo: 'Block Burst 1',
      Blockdurationdemaned: 'Progress 1',
      BlockdurationGranted: 'CHG 1',
      BlockdurationAvailed: 'Goods 1',
      BlockOutputUnit: 'Bhanu',
      BlockOutputQuantity:'Body',
      Remarks: 'Remarks for Progress 1'
    }
  ];

  const renderTableHeader = () => {
    const headerColumns = [
      'Sno',
      'Date',
      'Major Section',
      'Block Station/Station',
      'Direction',
      'Km',
      'Dept',
      'Type of Work',
      'Planned Block Duration',
      'Planned From',
      'Planned To',
      'Planned Unit',
      'Planned Quantity',
      'Designation',
      'Traffic Repercussion',
      'Demanded From',
      'Demanded To',
      'Granted From',
      'Granted To',
      'Availed From',
      'Availed To',
      'Block duration demaned',
      'Block duration Granted',
      'Block duration Availed',
      'BlockOutput Unit',
      'BlockOutput Quantity',
      'Remarks',
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
