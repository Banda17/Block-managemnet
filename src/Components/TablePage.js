import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash"; // lodash for easy multi-level sorting
//import NavBar from "./navbar";

const APISorter = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/accept")
      .then(response => {
        setData(response.data.data);
        if (response.data.data.length > 0) {
          // Get keys from the first object for the headers and filter out _id and __v
          const keys = Object.keys(response.data.data[0]).filter(key => key !== '_id' && key !== '__v');
          setHeaders(keys);
        }
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  const handleCheck = (event) => {
    const { name, checked } = event.target;
    setChecked(prev => checked ? [...prev, name] : prev.filter(e => e !== name));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Sort the data just before rendering
  const sortedData = checked.length > 0 ? _.orderBy(data, checked) : data;

  return (
    <div>
      <div className="columns is-multiline">
        {headers.map((header, index) => (
          <div className="column is-one-quarter" key={index}>
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name={header}
                  onChange={handleCheck}
                />
                {header}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              {headers.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                {headers.map(header => (
                  <td key={header}>
                    {header === 'date' ? formatDate(item[header]) : item[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default APISorter;
