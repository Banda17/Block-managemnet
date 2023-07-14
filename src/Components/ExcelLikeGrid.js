import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const RequestBlockPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [tableRows, setTableRows] = useState([]);

  const dropdownOptions = {
    Department: ['Trd', 'SnT', 'Engg'],
    typeOfWork: {
      Trd: ['Type A', 'Type B', 'Type C'],
      SnT: ['Type X', 'Type Y', 'Type Z'],
      Engg: ['Type P', 'Type Q', 'Type R'],
    },
    Board: ['WAT', 'RJY', 'TSR', 'UL', 'GDR', 'MTM'],
    designation: ['SSE', 'JE', 'Tech'],
    Station: {
      WAT: ['Thadi', 'Anakapalle', 'Kasimkota', 'Bayyavaram', 'Narasingapalli', 'Elamanchili', 'Regupalem', 'Narsipatnam Rd', 'Gullipadu', 'Tuni', 'Hamsavaram', 'Timmapuram', 'Annavaram', 'Ravikampadu', 'Durgada Gate', 'Gollaprolu', 'Pithapuram, Samalkot Jn', 'Gudaparti', 'Medapadu', 'Pedabramadvam', 'Bikkavolu', 'Balabhadrapuram', 'Anaparti', 'Dwarapudi', 'Kesavaram', 'Kadiyan'],
      RJY: ['Station D', 'Station E', 'Station F'],
      TSR: ['Station G', 'Station H', 'Station I'],
      UL: ['Station G', 'Station H', 'Station I'],
      GDR: ['Station G', 'Station H', 'Station I'],
      MTM: ['Station G', 'Station H', 'Station I'],
    },
    status: ['OpenLine', 'RVNL', 'Construction'],
    direction: ['UP', 'DN', 'UP/DN'],
  };

  const handleDropdownChange = (event, dropdownId) => {
    const { value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdownId]: value,
    }));
  };

  const handleAddRow = async () => {
    try {
      const newRow = { ...selectedOptions };
      const response = await axios.post('http://localhost:3001/request', newRow);

      if (response.status === 200) {
        setTableRows((prevRows) => [...prevRows, newRow]);
        setSelectedOptions({});
      } else {
        alert('Request failed');
      }
    } catch (error) {
      console.log('Error during request:', error);
    }
  };

  const renderDropdownOptions = (options) =>
    options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));

  const renderInputFields = (fieldIds) =>
    fieldIds.map((fieldId) => (
      <div className="field" key={fieldId}>
        <label className="label" htmlFor={fieldId}>
          {fieldId}:
        </label>
        <div className="control">
          <input
            type="text"
            id={fieldId}
            className="input"
            value={selectedOptions[fieldId] || ''}
            onChange={(event) => handleDropdownChange(event, fieldId)}
          />
        </div>
      </div>
    ));

  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <h2 className="title is-2 has-text-centered">Request Block Page</h2>
          <div className="columns is-multiline">
            <div className="column is-half">
              {renderInputFields(['Department', 'typeOfWork', 'Board', 'direction'])}
            </div>
            <div className="column is-half">
              {renderInputFields(['Block_Section_Station', 'designation', 'date', 'plannedBlockTo'])}
            </div>
            <div className="column is-half">
              {renderInputFields(['plannedBlockDuration', 'kmFrom', 'kmTo', 'Remarks'])}
            </div>
            <div className="column is-half">
              {renderInputFields(['status'])}
            </div>
          </div>
          <button className="button is-primary" onClick={handleAddRow}>
            Add Row
          </button>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Department</th>
                <th>Type of Block</th>
                <th>Direction</th>
                <th>Station/Section</th>
                <th>Designation</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Hour</th>
                <th>Km From</th>
                <th>Km To</th>
                <th>Remarks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.Department}</td>
                  <td>{row.typeOfWork}</td>
                  <td>{row.direction}</td>
                  <td>{row.Block_Section_Station}</td>
                  <td>{row.designation}</td>
                  <td>{moment(row.date).format('YYYY-MM-DD')}</td>
                  <td>{row.plannedBlockTo}</td>
                  <td>{row.plannedBlockDuration}</td>
                  <td>{row.kmFrom}</td>
                  <td>{row.kmTo}</td>
                  <td>{row.Remarks}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link className="button is-primary" to="/accept">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestBlockPage;
