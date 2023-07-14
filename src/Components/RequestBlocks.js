import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
//import NavBar from './navbar';

const RequestBlockPage = () => {
  //const [user, setUser] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    date: '',
    majorSection: '',
    direction: '',
    kmFrom: '',
    kmTo: '',
    Department: '',
    typeOfWork: '',
    plannedBlockDuration: '',
    plannedBlockFrom: '',
    plannedBlockTo: '',
    plannedUnit: '',
    plannedQuantity: '',
    Block_Section_Station: '',
    blockDurationAvailed: '',
    blockAvailedFrom: '',
    blockAvailedTo: '',
    blockBurst: '',
    blockDemandedDuration: '',
    blockDemandedConditions: '',
    blockGrantedFrom: '',
    blockGrantedTo: '',
    blockGrantedDuration: '',
    blockOutputUnit: '',
    blockOutputQuantity: '',
    Remarks: '',
    trafficRepercussion: '',
    designation: '',
    status: '',
  });
  const [tableRows, setTableRows] = useState([]);

  const dropdownOptions = {
    Department: ['Trd', 'SnT', 'Engg'],
    typeOfWork: {
      Trd: ['Type A', 'Type B', 'Type C'],
      SnT: ['Type X', 'Type Y', 'Type Z'],
      Engg: ['Type P', 'Type Q', 'Type R'],
    },
    Board: ['WAT', 'RJY', 'TSR','UL','GDR','MTM'],
    designation: ['SSE', 'JE', 'Tech'],
    Station: {
      'WAT': ['Thadi','Anakapalle','Kasimkota','Bayyavaram','Narasingapalli','Elamanchili','Regupalem','Narsipatnam Rd','Gullipadu','Tuni','Hamsavaram','Timmapuram','Annavaram','Ravikampadu','Durgada Gate','Gollaprolu','Pithapuram,Samalkot Jn','Gudaparti','Medapadu','Pedabramadvam','Bikkavolu','Balabhadrapuram','Anaparti','Dwarapudi','Kesavaram','Kadiyan'],
      'RJY': ['Station D', 'Station E', 'Station F'],
      'TSR': ['Station G', 'Station H', 'Station I'],
      'UL': ['Station G', 'Station H', 'Station I'],
      'GDR': ['Station G', 'Station H', 'Station I'],
      'MTM': ['Station G', 'Station H', 'Station I'],
    },
    status: ['OpenLine', 'RVNL', 'Construction'],
    direction: ['UP', 'DN', 'UP/DN']
  };

  const handleDropdownChange = (event, dropdownId) => {
    const { value } = event.target;

    if (dropdownId === 'Department') {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        Department: value,
        typeOfWork: '',
      }));
    } else {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [dropdownId]: value,
      }));
    }
  };

  const handleAddRow = async () => {
    const newRow = { ...selectedOptions };

    try {
      const response = await axios.post('http://192.168.0.109:3001/request', newRow);
      console.log(newRow);
      if (response.status === 200) {
        setTableRows((prevRows) => [...prevRows, newRow]);
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          Department: '',
          typeOfWork: '',
          Block_Section_Station: '',
          status: '',
        }));
      } else {
        alert('Request failed');
      }
    } catch (error) {
      console.log('Error during request:', error);
    }
  };

  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <h2 className="title is-2 has-text-centered" >Request Block Page</h2>
          <div className="field">
            <label className="label" htmlFor="Department">
              Department:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="Department"
                  className="input"
                  value={selectedOptions.Department}
                  onChange={(event) => handleDropdownChange(event, 'Department')}
                >
                  <option value="">Select a department</option>
                  {dropdownOptions.Department.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="typeOfWork">
              Type of Block:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="typeOfWork"
                  className="input"
                  value={selectedOptions.typeOfWork}
                  onChange={(event) => handleDropdownChange(event, 'typeOfWork')}
                  disabled={!selectedOptions.Department}
                >
                  <option value="">Select a block type</option>
                  {dropdownOptions.typeOfWork[selectedOptions.Department]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="Board">
              Board:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="Board"
                  className="input"
                  value={selectedOptions.Board}
                  onChange={(event) => handleDropdownChange(event, 'Board')}
                >
                  <option value="">Select a Board</option>
                  {dropdownOptions.Board.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="direction">
            Direction:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="status"
                  className="input"
                  value={selectedOptions.direction}
                  onChange={(event) => handleDropdownChange(event, 'direction')}
                >
                  <option value="">Select a direction</option>
                  {dropdownOptions.direction.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>




          <div className="field">
            <label className="label" htmlFor="Block_Section_Station">
              Station/Section:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="Block_Section_Station"
                  className="input"
                  value={selectedOptions.Block_Section_Station}
                  onChange={(event) => handleDropdownChange(event, 'Block_Section_Station')}
                  disabled={!selectedOptions.Board}
                >
                  <option value="">Select a Station/Section</option>
                  {dropdownOptions.Station[selectedOptions.Board]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="designation">
              Designation:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="designation"
                  className="input"
                  value={selectedOptions.designation}
                  onChange={(event) => handleDropdownChange(event, 'designation')}
                >
                  <option value="">Select a designation</option>
                  {dropdownOptions.designation.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="date">
              Date:
            </label>
            <div className="control">
              <input
                type="date"
                id="date"
                className="input"
                value={moment(selectedOptions.date).format('YYYY-MM-DD')}
                onChange={(event) => handleDropdownChange(event, 'date')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="plannedBlockTo">
              End Date:
            </label>
            <div className="control">
              <input
                type="date"
                id="plannedBlockTo"
                className="input"
                value={selectedOptions.plannedBlockTo}
                min={moment(selectedOptions.date).format('YYYY-MM-DD')}
                max={moment(selectedOptions.date).add(1, 'weeks').format('YYYY-MM-DD')}
                onChange={(event) => handleDropdownChange(event, 'plannedBlockTo')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="plannedBlockDuration">
              Hour:
            </label>
            <div className="control">
              <input
                type="text"
                id="plannedBlockDuration"
                className="input"
                value={selectedOptions.plannedBlockDuration}
                onChange={(event) => handleDropdownChange(event, 'plannedBlockDuration')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="kmFrom">
              Km From:
            </label>
            <div className="control">
              <input
                type="text"
                id="kmFrom"
                className="input"
                value={selectedOptions.kmFrom}
                onChange={(event) => handleDropdownChange(event, 'kmFrom')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="kmTo">
              Km To:
            </label>
            <div className="control">
              <input
                type="text"
                id="kmTo"
                className="input"
                value={selectedOptions.kmTo}
                onChange={(event) => handleDropdownChange(event, 'kmTo')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="Remarks">
              Remarks:
            </label>
            <div className="control">
              <textarea
                id="Remarks"
                className="textarea"
                value={selectedOptions.Remarks}
                onChange={(event) => handleDropdownChange(event, 'Remarks')}
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="status">
              Status:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="status"
                  className="input"
                  value={selectedOptions.status}
                  onChange={(event) => handleDropdownChange(event, 'status')}
                >
                  <option value="">Select a status</option>
                  {dropdownOptions.status.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
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
          <Link className="button is-primary" to="/accept">Next</Link>
        </div>
      </div>
    </div>
  );
};

export default RequestBlockPage;
