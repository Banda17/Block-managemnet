import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import * as XLSX from 'xlsx';
//import NavBar from './navbar';

const AcceptancePage = () => {
  const [tableData, setTableData] = useState([]);
  //const [user, setUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://1727-2401-4900-4e1a-dde-1ca8-23f-f8e7-2b11.ngrok-free.app/accept');
      setTableData(response.data.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  const handleFieldChange = (event, index, field) => {
    const newData = [...tableData];
    newData[index][field] = event.target.value;
    if (field === 'plannedBlockFrom' || field === 'plannedBlockTo') {
      // Calculate plannedBlockDuration
      const fromTime = newData[index].plannedBlockFrom;
      const toTime = newData[index].plannedBlockTo;
      if (fromTime && toTime) {
        const totalDuration = calculateDuration(fromTime, toTime);
        newData[index].plannedBlockDuration = totalDuration;
      }
    } else if (field === 'blockGrantedFrom' || field === 'blockGrantedTo') {
      // Calculate blockDurationGranted
      const fromTime = newData[index].blockGrantedFrom;
      const toTime = newData[index].blockGrantedTo;
      if (fromTime && toTime) {
        const totalDuration = calculateDuration(fromTime, toTime);
        newData[index].blockGrantedDuration = totalDuration;
      }
    } else if (field === 'blockAvailedFrom' || field === 'blockAvailedTo') {
      // Calculate blockDurationAvailed
      const fromTime = newData[index].blockAvailedFrom;
      const toTime = newData[index].blockAvailedTo;
      if (fromTime && toTime) {
        const totalDuration = calculateDuration(fromTime, toTime);
        newData[index].blockDurationAvailed = totalDuration;
        // Calculate blockBurst and blockBurstExtendeds
        const blockDurationGranted = newData[index].blockGrantedDuration;
        if (totalDuration > blockDurationGranted) {
          newData[index].blockBurst = 'Block Burst';
          newData[index].blockBurstExtendeds = 'Block Burst';
        } else {
          newData[index].blockBurst = '';
          newData[index].blockBurstExtendeds = '';
        }
      }
    }
    setTableData(newData);
  };

  const calculateDuration = (fromTime, toTime) => {
    const from = fromTime.split(':');
    const to = toTime.split(':');
    const fromHours = parseInt(from[0]);
    const fromMinutes = parseInt(from[1]);
    const toHours = parseInt(to[0]);
    const toMinutes = parseInt(to[1]);
  
    let durationHours = toHours - fromHours;
    let durationMinutes = toMinutes - fromMinutes;
  
    if (durationHours < 0) {
      // Adjust for negative duration when the toTime is less than the fromTime
      durationHours += 24;
    }
  
    if (durationMinutes < 0) {
      // Adjust for negative duration when the toTime is less than the fromTime
      durationHours -= 1;
      durationMinutes += 60;
    }
  
    const totalDuration = durationHours * 60 + durationMinutes;
    return totalDuration;
  };

  const handleRequest = async (row) => {
    try {
      const response = await axios.patch(` https://350b-2401-4900-4e1a-dde-85fe-6d20-2674-2f88.ngrok-free.app/updateAcceptance/${row._id}`, row);
      console.log(response.data); // Optionally, handle the response from the backend
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Acceptance Data');
    XLSX.writeFile(workbook, 'acceptance_data.xlsx');
  };

  return (
    <div>
      <div className='section'>
        <Link className="column is-one-quarter " to="/dashboard">Back to Dashboard</Link>
        <button className="button is-danger" onClick={downloadExcel}>Download as Excel</button>
      </div>
    <div className="table-container">
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" style={{ fontSize: '12px' }}>
        {/* Table headers */}
        <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>Divison</th>
            <th>Major Section</th>
            <th>Status</th>
            <th>Block Station From</th>
            <th>Block Station To</th>
            <th>Direction</th>
            <th>Km From</th>
            <th>Km To</th>
            <th>Dept</th>
            <th>Type of Work</th>
            <th>Miain or Shadow</th>
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
            <th>Block OutputUnit</th>
            <th>Block OutputQuantity</th>
            <th>Remarks</th>
            <th>Request</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row._id}>
              <td>{row.date}</td>
              <td>{row['Div']}</td>
              <td>{row['Major Section']}</td>
              <td>{row.status}</td>
              <td>{row.BlockStationfrom}</td>
              <td>{row.BlockStationTo}</td>
              <td>{row.direction}</td>
              <td>{row.kmFrom}</td>
              <td>{row.kmTo}</td>
              <td>{row.Department}</td>
              <td>{row.typeOfWork}</td>
              <td>{row.mainorshadow}</td>
              <td>
                <input
                  type="time"
                  value={row.plannedBlockFrom}
                  onChange={(event) => handleFieldChange(event, index, 'plannedBlockFrom')}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={row.plannedBlockTo}
                  onChange={(event) => handleFieldChange(event, index, 'plannedBlockTo')}
                />
              </td>
              <td>{row.plannedBlockDuration} minutes</td>
              <td>
                <input
                  type="text"
                  value={row.plannedUnit}
                  onChange={(event) => handleFieldChange(event, index, 'plannedUnit')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.plannedQuantity}
                  onChange={(event) => handleFieldChange(event, index, 'plannedQuantity')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.trafficRepercussion}
                  onChange={(event) => handleFieldChange(event, index, 'trafficRepercussion')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.blockDemandedDuration}
                  onChange={(event) => handleFieldChange(event, index, 'blockDemandedDuration')}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={row.blockGrantedFrom}
                  onChange={(event) => handleFieldChange(event, index, 'blockGrantedFrom')}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={row.blockGrantedTo}
                  onChange={(event) => handleFieldChange(event, index, 'blockGrantedTo')}
                />
              </td>
              <td>{row.blockGrantedDuration} minutes</td>
              <td>
                <input
                  type="time"
                  value={row.blockAvailedFrom}
                  onChange={(event) => handleFieldChange(event, index, 'blockAvailedFrom')}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={row.blockAvailedTo}
                  onChange={(event) => handleFieldChange(event, index, 'blockAvailedTo')}
                />
              </td>
              <td>{row.blockDurationAvailed} minutes</td>
              <td>
                {row.blockDurationAvailed > row.blockGrantedDuration ? (
                  <select
                    value={row.blockDemandedConditions}
                    onChange={(event) => handleFieldChange(event, index, 'blockDemandedConditions')}
                  >
                    <option value="Block Burst">Block Burst</option>
                    <option value="Block Burst Extended">Block Burst Extended</option>
                  </select>
                ) : (
                  ''
                )}
              </td>
              <td>
                <input
                  type="text"
                  value={row.blockBlockOutput}
                  onChange={(event) => handleFieldChange(event, index, 'blockBlockOutput')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.blockOutputQuantity}
                  onChange={(event) => handleFieldChange(event, index, 'blockOutputQuantity')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.Remarks}
                  onChange={(event) => handleFieldChange(event, index, 'Remarks')}
                />
              </td>
              <td>
                <button className="button is-primary" onClick={() => handleRequest(row)}>Request</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AcceptancePage;
