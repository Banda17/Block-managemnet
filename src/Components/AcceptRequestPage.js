import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptancePage = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Blocks');
      setTableData(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleFieldChange = (event, index, field) => {
    const newData = [...tableData];
    newData[index][field] = event.target.value;
    setTableData(newData);
  };

  return (
    <div style={{ width: '100%' }}>
      <h1>Acceptance Page</h1>
      <table className="table table-bordered table-responsive-lg" style={{ fontSize: '10px' }}>
        <thead className="thead-light">
          <tr>
            <th>Sno</th>
            <th>Date</th>
            <th>Major Section</th>
            <th>Block Station/Station From</th>
            <th>Block Station/Station To</th>
            <th>Direction</th>
            <th>Km From</th>
            <th>Km To</th>
            <th>Dept</th>
            <th>Type of Work</th>
            <th>Planned From</th>
            <th>Planned To</th>
            <th>Planned Unit</th>
            <th>Planned Quantity</th>
            <th>Designation</th>
            <th>Traffic Repercussion</th>
            <th>Demanded From</th>
            <th>Demanded To</th>
            <th>Granted From</th>
            <th>Granted To</th>
            <th>Availed From</th>
            <th>Availed To</th>
            <th>Block duration demaned</th>
            <th>Block duration Granted</th>
            <th>Block duration Availed</th>
            <th>Block OutputUnit</th>
            <th>Block OutputQuantity</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.id}>
              <td>{row.Sno}</td>
              <td>{row.Date}</td>
              <td>{row['Major Section']}</td>
              <td>{row['Block Station/Station From']}</td>
              <td>{row['Block Station/Station To']}</td>
              <td>{row.Direction}</td>
              <td>{row['KM From']}</td>
              <td>{row['KM To']}</td>
              <td>{row.Dept}</td>
              <td>{row['Type of Work']}</td>
              <td>{row['Planned From (HH:MM)']}</td>
              <td>{row['Planned Block Duration (in mins)']}</td>
              <td>{row['Planned Unit']}</td>
              <td>{row['Planned Quantity']}</td>
              <td>{row.Designation}</td>
              <td>
                <input
                  type="text"
                  value={row['Traffic Repercussion']}
                  onChange={(event) => handleFieldChange(event, index, 'Traffic Repercussion')}
                />
              </td>
              <td>{row['Demanded From']}</td>
              <td>{row['Demanded To']}</td>
              <td>{row['Granted From']}</td>
              <td>{row['Granted To']}</td>
              <td>{row['Availed From']}</td>
              <td>{row['Availed To']}</td>
              <td>{row['Block duration demaned']}</td>
              <td>{row['Block duration Granted']}</td>
              <td>{row['Block duration Availed']}</td>
              <td>
                <input
                  type="text"
                  value={row['Block OutputUnit']}
                  onChange={(event) => handleFieldChange(event, index, 'Block OutputUnit')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row['Block OutputQuantity']}
                  onChange={(event) => handleFieldChange(event, index, 'Block OutputQuantity')}
                />
              </td>
              <td>{row.Remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptancePage;
