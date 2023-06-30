import React, { useState } from 'react';
import './requestBlockPage.css';
import moment from 'moment';

const SideMenu = () => {
  return (
    <div className="side-menu">
      {/* Side menu content */}
      <ul className="list-group">
        <li className="list-group-item">Menu Item 1</li>
        <li className="list-group-item">Menu Item 2</li>
        <li className="list-group-item">Menu Item 3</li>
      </ul>
    </div>
  );
};

const RequestBlockPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    department: '',
    blockType: '',
    designation: '',
    board: '',
    station: '',
    startDate: '',
    endDate: '',
    hour: '',
    km: '',
    description: ''
  });

  const dropdownOptions = {
    department: ['Department 1', 'Department 2', 'Department 3'],
    blockType: ['Type A', 'Type B', 'Type C'],
    designation: ['Designation 1', 'Designation 2', 'Designation 3'],
    board: ['Board 1', 'Board 2', 'Board 3'],
    station: {
      'Board 1': ['Station A', 'Station B', 'Station C'],
      'Board 2': ['Station D', 'Station E', 'Station F'],
      'Board 3': ['Station G', 'Station H', 'Station I']
    }
  };

  const handleDropdownChange = (event, dropdownId) => {
    const { value } = event.target;
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [dropdownId]: value
    }));
  };

  const handleSubmitRequest = () => {
    // Here you can perform your backend request submission logic
    console.log(selectedOptions); // Placeholder code to display the selected options
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <SideMenu />
        </div>
        <div className="col-md-9">
          <h2>Request Block Page</h2>
          <div className="content">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              className="form-control"
              value={selectedOptions.department}
              onChange={event => handleDropdownChange(event, 'department')}
            >
              <option value="">Select a department</option>
              {dropdownOptions.department.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="blockType">Type of Block:</label>
            <select
              id="blockType"
              className="form-control"
              value={selectedOptions.blockType}
              onChange={event => handleDropdownChange(event, 'blockType')}
            >
              <option value="">Select a block type</option>
              {dropdownOptions.blockType.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="designation">Designation:</label>
            <select
              id="designation"
              className="form-control"
              value={selectedOptions.designation}
              onChange={event => handleDropdownChange(event, 'designation')}
            >
              <option value="">Select a designation</option>
              {dropdownOptions.designation.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="board">Board:</label>
            <select
              id="board"
              className="form-control"
              value={selectedOptions.board}
              onChange={event => handleDropdownChange(event, 'board')}
            >
              <option value="">Select a board</option>
              {dropdownOptions.board.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="station">Station:</label>
            <select
              id="station"
              className="form-control"
              value={selectedOptions.station}
              onChange={event => handleDropdownChange(event, 'station')}
            >
              <option value="">Select a station</option>
              {dropdownOptions.station[selectedOptions.board]?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={selectedOptions.startDate}
              onChange={event => handleDropdownChange(event, 'startDate')}
            />

            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={selectedOptions.endDate}
              min={selectedOptions.startDate}
              max={moment(selectedOptions.startDate).add(1, 'weeks').format('YYYY-MM-DD')}
              onChange={event => handleDropdownChange(event, 'endDate')}
            />

            <label htmlFor="hour">Hour:</label>
            <input
              type="text"
              id="hour"
              className="form-control"
              value={selectedOptions.hour}
              onChange={event => handleDropdownChange(event, 'hour')}
            />

            <label htmlFor="km">Km:</label>
            <input
              type="text"
              id="km"
              className="form-control"
              value={selectedOptions.km}
              onChange={event => handleDropdownChange(event, 'km')}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="form-control"
              value={selectedOptions.description}
              onChange={event => handleDropdownChange(event, 'description')}
            ></textarea>

            <button className="btn btn-primary" onClick={handleSubmitRequest}>
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBlockPage;
