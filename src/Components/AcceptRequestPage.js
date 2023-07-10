import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';


const AcceptancePage = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/accept');
      setTableData(response.data.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleFieldChange = (event, index, field) => {
    const newData = [...tableData];
    newData[index][field] = event.target.value;
    setTableData(newData);
  };

  const handleRequest = (row) => {
    console.log('Accepted');
  };


  const handleAccept = (row) => {
    console.log('Accepted');
  };

  const handleReject = (row) => {
    console.log('Rejected');
  };

  return (
    <div className="table-container">
      <h1>Acceptance Page</h1>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" style={{ fontSize: '12px' }}>
        <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>Major Section</th>
            <th>Block Station/Section</th>
            <th>Direction</th>
            <th>Km From</th>
            <th>Km To</th>
            <th>Dept</th>
            <th>Type of Work</th>
            <th>Planned From</th>
            <th>Planned To</th>
            <th>Planned Duration</th>
            <th>Planned Unit</th>
            <th>Planned Quantity</th>
            <th>Traffic Repercussion</th>
            <th>Block duration demanded</th>
            <th>Granted From</th>
            <th>Granted To</th>
            <th>Block duration Granted</th>
            <th>Availed From</th>
            <th>Availed To</th>
            <th>Block duration Availed</th>
            <th>Block Burst</th>
            <th>Block Burst/Extendeds</th>
            <th>Block OutputUnit</th>
            <th>Block OutputQuantity</th>
            <th>Remarks</th>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row._id}>
              <td>{row.date}</td>
              <td>{row['majorSection']}</td>
              <td>{row['Block_Section_Station']}</td>
              <td>{row.direction}</td>
              <td>{row["kmFrom"]}</td>
              <td>{row["kmTo"]}</td>
              <td>{row.Department}</td>
              <td>{row['typeOfWork']}</td>
              <td>{row['plannedBlockFrom']}</td>
              <td>{row['plannedBlockTo']}</td>
              <td>{row[" plannedBlockDuration"]}</td>
              <td>
                <input
                  type="text"
                  value={row['Planned Unit']}  
                  onChange={(event) => handleFieldChange(event, index , 'Planned Unit')}    
                      /></td>
              <td>
                <input
                  type="text"
                  value={row['Planned Unit']}
                  onChange={(event) => handleFieldChange(event,index,'Planned Quantity')}
              /></td>
              <td>
                <input
                  type="text"
                  value={row['Traffic Repercussion']}
                  onChange={(event) => handleFieldChange(event, index, 'Traffic Repercussion')}
                />
              </td>
              <td>
                <input
                  id="timepicker"
                  value={row['blockDemandedDuration']}
                  onChange={(event) => handleFieldChange(event,index,'blockDemandedDuration')}
                />
              </td>
              <td>
                <input
                  id="timepicker"
                  value={row['Granted From']}
                  onChange={(event) => handleFieldChange(event,index,'Granted From')}
                />
              </td>
              <td>
                <input
                  id="timepicker"
                  value={row['Granted To']}
                  onChange={(event) => handleFieldChange(event,index,'Granted To')}
                />
              </td>
              <td>{row['Block duration Granted']}</td>
              <td>
                <input
                  id="timepicker"
                  value={row['Availed From']}
                  onChange={(event) => handleFieldChange(event,index,'Availed From')}
                />
              </td>
              <td>
                <input
                  id="timepicker"
                  value={row['Availed To']}
                  onChange={(event) => handleFieldChange(event,index,'Availed To')}
                />
              </td>
              <td>{row['Block duration Availed']}</td>
              <td>{row['blockburst']}</td>
              <td>
                <select
                value={row['blockDemandedConditions']}
                onChange={(event) => handleFieldChange(event, index, 'blockDemandedConditions')}
                >
                  <option value=""></option>
                  <option value="blockBurst">blockBurst</option>
                  <option value="extended">extended</option>
                </select>
              </td>
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
              <td><input
                  type="textbox"
                  value={row['remarks']}
                  onChange={(event) => handleFieldChange(event, index, 'remarks' )}
                />
              </td>
              <td>
                <button onClick={() => handleRequest(row)}>Request</button>
              </td>
              <td>
                <button onClick={() => handleAccept(row)}>Accept</button>
                <button onClick={() => handleReject(row)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptancePage;
