import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import moment from 'moment';
import axios from 'axios';

const RequestBlockPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    date: new Date(),
    department: '',
    typeOfWork: '',
    designation: '',
    plannedBlockFrom: '',
    plannedBlockTo: '',
    plannedBlockDuration: '',
    kmFrom: '',
    kmTo: '',
    remarks: ''
  });

  const [tableRows, setTableRows] = useState([]);

  const dropdownOptions = {
    Department: ['Trd', 'SnT', 'Engg'],
    typeOfWork: {
      'Trd': ['Type A', 'Type B', 'Type C'],
      'SnT': ['Type X', 'Type Y', 'Type Z'],
      'Engg': ['Type P', 'Type Q', 'Type R']
    },
    designation: ['SSE', 'JE', 'Tech']
  };
  

  const handleDropdownChange = (event, dropdownId) => {
    const { value } = event.target;
  
    if (dropdownId === 'department') {
      setSelectedOptions(prevOptions => ({
        ...prevOptions,
        department: value,
        typeOfWork: '' // Reset the typeOfWork field when department changes
      }));
    } else {
      setSelectedOptions(prevOptions => ({
        ...prevOptions,
        [dropdownId]: value
      }));
    }
  };
  

  const handleAddRow = () => {
    setTableRows(prevRows => [...prevRows, { ...selectedOptions }]);
  };

  const handleRowChange = (event, index, fieldName) => {
    const { value } = event.target;

    setTableRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index][fieldName] = value;
      return updatedRows;
    });
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    const requestData = {
      mainData: {
        date: selectedOptions.date,
        department: selectedOptions.department,
        typeOfWork: selectedOptions.typeOfWork,
        designation: selectedOptions.designation,
        plannedBlockFrom: selectedOptions.plannedBlockFrom,
        plannedBlockTo: selectedOptions.plannedBlockTo,
        plannedBlockDuration: selectedOptions.plannedBlockDuration,
        kmFrom: selectedOptions.kmFrom,
        kmTo: selectedOptions.kmTo,
        remarks: selectedOptions.remarks
      },
      rowsData: tableRows.map(row => ({
        department: row.department,
        typeOfWork: row.typeOfWork,
        designation: row.designation,
        plannedBlockFrom: row.plannedBlockFrom,
        plannedBlockTo: row.plannedBlockTo,
        plannedBlockDuration: row.plannedBlockDuration,
        kmFrom: row.kmFrom,
        kmTo: row.kmTo,
        remarks: row.remarks
      }))
    };

    try {
      const response = await axios.post('http://localhost:3001/request', requestData);

      if (response.status === 200) {
        const selectedOptions = response.data.mainData;
        const rowsData = response.data.rowsData;
        setSelectedOptions(selectedOptions);
        setTableRows(rowsData);
      } else {
        console.log('Request failed');
      }
    } catch (error) {
      console.log('Error during request:', error);
    }

    console.log(selectedOptions);
    console.log(tableRows);
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h2>Request Block Page</h2>
          <div className="field">
            <label className="label" htmlFor="department">Department:</label>
            <div className="control">
              <div className="select">
                <select
                  id="department"
                  className="input"
                  value={selectedOptions.department}
                  onChange={event => handleDropdownChange(event, 'department')}
                >
                  <option value="">Select a department</option>
                  {dropdownOptions.Department.map(option => (
  <option key={option} value={option}>
    {option}
  </option>
))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
  <label className="label" htmlFor="typeOfWork">Type of Block:</label>
  <div className="control">
    <div className="select">
      <select
        id="typeOfWork"
        className="input"
        value={selectedOptions.typeOfWork}
        onChange={event => handleDropdownChange(event, event.target.value)}
        disabled={!selectedOptions.department}
      >
        <option value="">Select a block type</option>
        {dropdownOptions.typeOfWork[selectedOptions.department]?.map(option => (
  <option key={option} value={option}>
    {option}
  </option>
))}
      </select>
    </div>
  </div>
</div>

          <div className="field">
            <label className="label" htmlFor="designation">Designation:</label>
            <div className="control">
              <div className="select">
                <select
                  id="designation"
                  className="input"
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
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="plannedBlockFrom">Start Date:</label>
            <div className="control">
              <input
                type="date"
                id="plannedBlockFrom"
                className="input"
                value={moment(selectedOptions.date).format('YYYY-MM-DD')}
                onChange={event => handleDropdownChange(event, 'date')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="plannedBlockTo">End Date:</label>
            <div className="control">
              <input
                type="date"
                id="plannedBlockTo"
                className="input"
                value={selectedOptions.plannedBlockTo}
                min={moment(selectedOptions.date).format('YYYY-MM-DD')}
                max={moment(selectedOptions.date).add(1, 'weeks').format('YYYY-MM-DD')}
                onChange={event => handleDropdownChange(event, 'plannedBlockTo')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="plannedBlockDuration">Hour:</label>
            <div className="control">
              <input
                type="text"
                id="plannedBlockDuration"
                className="input"
                value={selectedOptions.plannedBlockDuration}
                onChange={event => handleDropdownChange(event, 'plannedBlockDuration')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="kmFrom">Km From:</label>
            <div className="control">
              <input
                type="text"
                id="kmFrom"
                className="input"
                value={selectedOptions.kmFrom}
                onChange={event => handleDropdownChange(event, 'kmFrom')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="kmTo">Km To:</label>
            <div className="control">
              <input
                type="text"
                id="kmTo"
                className="input"
                value={selectedOptions.kmTo}
                onChange={event => handleDropdownChange(event, 'kmTo')}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="remarks">Remarks:</label>
            <div className="control">
              <textarea
                id="remarks"
                className="textarea"
                value={selectedOptions.remarks}
                onChange={event => handleDropdownChange(event, 'remarks')}
              ></textarea>
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
                <th>Designation</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Hour</th>
                <th>Km From</th>
                <th>Km To</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.department}
                      onChange={event => handleRowChange(event, index, 'department')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.typeOfWork}
                      onChange={event => handleRowChange(event, index, 'typeOfWork')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.designation}
                      onChange={event => handleRowChange(event, index, 'designation')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.date}
                      onChange={event => handleRowChange(event, index, 'date')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.plannedBlockTo}
                      onChange={event => handleRowChange(event, index, 'plannedBlockTo')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.plannedBlockDuration}
                      onChange={event => handleRowChange(event, index, 'plannedBlockDuration')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.kmFrom}
                      onChange={event => handleRowChange(event, index, 'kmFrom')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.kmTo}
                      onChange={event => handleRowChange(event, index, 'kmTo')}
                      className="input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={event => handleRowChange(event, index, 'remarks')}
                      className="input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="button is-primary" onClick={handleSubmitRequest}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestBlockPage;
