import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { duration } from "time-duration";
import 'bulma/css/bulma.min.css';

const SummaryPage = () => {
  const [lines, setLines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/accept');
      const data = response.data.data;
      console.log(data);
      setLines(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getUniqueDates = (lines) => {
    const uniqueDates = Array.from(new Set(lines.map((line) => line.date)));
    return uniqueDates;
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const renderBlockData = (lines, uniqueDates) => {
    
    function timeConvert(n) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
      }
      

    return (
      <>
        {uniqueDates.map((date) => {
          const filteredLines = lines.filter((line) => line.date === date);
          const sntBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'OpenLine' ? 1 : 0),
            0
          );
          const trdBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'OpenLine' ? 1 : 0),
            0
          );
          const enggBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'OpenLine' ? 1 : 0),
            0
          );
  
          const sntGrantedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' | line.blockDurationAvailed && line.status === 'openline' ? 1 : 0),
            0
          );
          const trdGrantedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' | line.blockDurationAvailed && line.status === 'openline' ? 1 : 0),
            0
          );
          const enggGrantedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' | line.blockDurationAvailed && line.status === 'openline' ? 1 : 0),
            0
          );
  
          const sntAvailedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'openline' ? 1 : 0),
            0
          );
          const trdAvailedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'openline' ? 1 : 0),
            0
          );
          const enggAvailedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'openline' ? 1 : 0),
            0
          );
  
          const sntTotalDurationGranted = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'openline'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const trdTotalDurationGranted = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'openline'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const enggTotalDurationGranted = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'openline'
                ? line.blockGrantedDuration
                : 0),
            0
          );
  
          const sntTotalDurationAvailed = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDurationAvailed && line.status === 'openline'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const trdTotalDurationAvailed = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDurationAvailed && line.status === 'openline'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const enggTotalDurationAvailed = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDurationAvailed && line.status === 'openline'
                ? line.blockDurationAvailed
                : 0),
            0
          );
  
          const sntTotalDurationDemanded = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'openline'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const trdTotalDurationDemanded = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'openline'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const enggTotalDurationDemanded = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'openline'
                ? line.blockDemandedDuration
                : 0),
            0
          );
  
          const sntTotalHoursGranted =Math.floor(sntTotalDurationGranted / 60); // Convert minutes to hours
          const trdTotalHoursGranted =Math.floor(trdTotalDurationGranted / 60); // Convert minutes to hours
          const enggTotalHoursGranted =Math.floor(enggTotalDurationGranted / 60); // Convert minutes to hours
  
          const sntTotalHoursAvailed =Math.floor(sntTotalDurationAvailed / 60); // Convert minutes to hours
          const trdTotalHoursAvailed =Math.floor(trdTotalDurationAvailed / 60); // Convert minutes to hours
          const enggTotalHoursAvailed =Math.floor(enggTotalDurationAvailed / 60); // Convert minutes to hours
  
          const sntTotalHoursDemanded =Math.floor(sntTotalDurationDemanded / 60); // Convert minutes to hours
          const trdTotalHoursDemanded =Math.floor(trdTotalDurationDemanded / 60); // Convert minutes to hours
          const enggTotalHoursDemanded =Math.floor(enggTotalDurationDemanded / 60); // Convert minutes to hours

          const sntBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'construction' ? 1 : 0),
            0
          );
          const trdBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'construction' ? 1 : 0),
            0
          );
          const enggBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'construction' ? 1 : 0),
            0
          );
  
          const sntGrantedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' | line.blockDurationAvailed && line.status === 'construction' ? 1 : 0),
            0
          );
          const trdGrantedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' | line.blockDurationAvailed && line.status === 'construction' ? 1 : 0),
            0
          );
          const enggGrantedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' | line.blockDurationAvailed && line.status === 'construction' ? 1 : 0),
            0
          );
  
          const sntAvailedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'construction' ? 1 : 0),
            0
          );
          const trdAvailedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'construction' ? 1 : 0),
            0
          );
          const enggAvailedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'construction' ? 1 : 0),
            0
          );
  
          const sntTotalDurationGranted3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'construction'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const trdTotalDurationGranted3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'construction'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const enggTotalDurationGranted3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'construction'
                ? line.blockGrantedDuration
                : 0),
            0
          );
  
          const sntTotalDurationAvailed3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDurationAvailed && line.status === 'construction'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const trdTotalDurationAvailed3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDurationAvailed && line.status === 'construction'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const enggTotalDurationAvailed3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDurationAvailed && line.status === 'construction'
                ? line.blockDurationAvailed
                : 0),
            0
          );
  
          const sntTotalDurationDemanded3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'construction'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const trdTotalDurationDemanded3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'construction'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const enggTotalDurationDemanded3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'construction'
                ? line.blockDemandedDuration
                : 0),
            0
          );
  
          const sntTotalHoursGranted3 =Math.floor(sntTotalDurationGranted3 / 60); // Convert minutes to hours
          const trdTotalHoursGranted3 =Math.floor(trdTotalDurationGranted3 / 60); // Convert minutes to hours
          const enggTotalHoursGranted3 =Math.floor(enggTotalDurationGranted3 / 60); // Convert minutes to hours
  
          const sntTotalHoursAvailed3 =Math.floor(sntTotalDurationAvailed3 / 60); // Convert minutes to hours
          const trdTotalHoursAvailed3 =Math.floor(trdTotalDurationAvailed3 / 60); // Convert minutes to hours
          const enggTotalHoursAvailed3 =Math.floor(enggTotalDurationAvailed3 / 60); // Convert minutes to hours
  
          const sntTotalHoursDemanded3 =Math.floor(sntTotalDurationDemanded3 / 60); // Convert minutes to hours
          const trdTotalHoursDemanded3 =Math.floor(trdTotalDurationDemanded3 / 60); // Convert minutes to hours
          const enggTotalHoursDemanded3 =Math.floor(enggTotalDurationDemanded3 / 60); // Convert minutes to hours

          const sntBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const trdBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const enggBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'RVNL' ? 1 : 0),
            0
          );
  
          const sntGrantedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' | line.blockDurationAvailed && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const trdGrantedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' | line.blockDurationAvailed && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const enggGrantedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' | line.blockDurationAvailed && line.status === 'RVNL' ? 1 : 0),
            0
          );
  
          const sntAvailedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const trdAvailedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const enggAvailedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'RVNL' ? 1 : 0),
            0
          );
  
          const sntTotalDurationGranted2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'RVNL'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const trdTotalDurationGranted2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'RVNL'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const enggTotalDurationGranted2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'RVNL'
                ? line.blockGrantedDuration
                : 0),
            0
          );
  
          const sntTotalDurationAvailed2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDurationAvailed && line.status === 'RVNL'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const trdTotalDurationAvailed2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDurationAvailed && line.status === 'RVNL'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const enggTotalDurationAvailed2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDurationAvailed && line.status === 'RVNL'
                ? line.blockDurationAvailed
                : 0),
            0
          );
  
          const sntTotalDurationDemanded2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'RVNL'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const trdTotalDurationDemanded2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'RVNL'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const enggTotalDurationDemanded2 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'RVNL'
                ? line.blockDemandedDuration
                : 0),
            0
          );
  
          const sntTotalHoursGranted2 =Math.floor(sntTotalDurationGranted2 / 60); // Convert minutes to hours
          const trdTotalHoursGranted2 =Math.floor(trdTotalDurationGranted2 / 60); // Convert minutes to hours
          const enggTotalHoursGranted2 =Math.floor(enggTotalDurationGranted2 / 60); // Convert minutes to hours
  
          const sntTotalHoursAvailed2 =Math.floor(sntTotalDurationAvailed2 / 60); // Convert minutes to hours
          const trdTotalHoursAvailed2 =Math.floor(trdTotalDurationAvailed2 / 60); // Convert minutes to hours
          const enggTotalHoursAvailed2 =Math.floor(enggTotalDurationAvailed2 / 60); // Convert minutes to hours
  
          const sntTotalHoursDemanded2 =Math.floor(sntTotalDurationDemanded2 / 60); // Convert minutes to hours
          const trdTotalHoursDemanded2 =Math.floor(trdTotalDurationDemanded2 / 60); // Convert minutes to hours
          const enggTotalHoursDemanded2 =Math.floor(enggTotalDurationDemanded2 / 60); // Convert minutes to hours

          const totalA = sntAvailedBlocksCount + trdAvailedBlocksCount + enggAvailedBlocksCount +sntAvailedBlocksCount2 + trdAvailedBlocksCount2 + enggAvailedBlocksCount2 + sntAvailedBlocksCount3 + trdAvailedBlocksCount3 + enggAvailedBlocksCount3;
          const totalG = sntGrantedBlocksCount + trdGrantedBlocksCount + enggGrantedBlocksCount + sntGrantedBlocksCount2 + trdGrantedBlocksCount2 + enggGrantedBlocksCount2 + sntGrantedBlocksCount3 + trdGrantedBlocksCount3 + enggGrantedBlocksCount3; 
          const totalD = sntBlocksCount + trdBlocksCount + enggBlocksCount + sntBlocksCount2 + trdBlocksCount2 + enggBlocksCount2 + sntBlocksCount3 + trdBlocksCount3 + enggBlocksCount3;

          const DurationA = (sntTotalDurationAvailed + trdTotalDurationAvailed + enggTotalDurationAvailed + sntTotalDurationAvailed2 + trdTotalDurationAvailed2 + enggTotalDurationAvailed2 + sntTotalDurationAvailed3 + trdTotalDurationAvailed3 + enggTotalDurationAvailed3);
          return (
            <React.Fragment key={date}>
              <tr>
                <td rowSpan="4">{formatDate(date)}</td>
              </tr>
              <tr>
                <td rowSpan=""></td>
                <td>Granted</td>
                <td>{sntGrantedBlocksCount}</td>
                <td>{sntTotalHoursGranted}h</td>
                <td>{trdGrantedBlocksCount}</td>
                <td>{trdTotalHoursGranted}h</td>
                <td>{enggGrantedBlocksCount}</td>
                <td>{enggTotalHoursGranted}h</td>
          
                <td>{sntGrantedBlocksCount2}</td>
                <td>{sntTotalHoursGranted2}h</td>
                <td>{trdGrantedBlocksCount2}</td>
                <td>{trdTotalHoursGranted2}h</td>
                <td>{enggGrantedBlocksCount2}</td>
                <td>{enggTotalHoursGranted2}h</td>

                <td>{sntGrantedBlocksCount3}</td>
                <td>{sntTotalHoursGranted3}h</td>
                <td>{trdGrantedBlocksCount3}</td>
                <td>{trdTotalHoursGranted3}h</td>
                <td>{enggGrantedBlocksCount3}</td>
                <td>{enggTotalHoursGranted3}h</td>
                <td>{totalG}</td>
                
              </tr>
              <tr>
                <td rowSpan=""></td>
                <td>Availed</td>
                <td>{sntAvailedBlocksCount}</td>
                <td>{sntTotalHoursAvailed}h</td>
                <td>{trdAvailedBlocksCount}</td>
                <td>{trdTotalHoursAvailed}h</td>
                <td>{enggAvailedBlocksCount}</td>
                <td>{enggTotalHoursAvailed}h</td>
                
                <td>{sntAvailedBlocksCount2}</td>
                <td>{sntTotalHoursAvailed2}h</td>
                <td>{trdAvailedBlocksCount2}</td>
                <td>{trdTotalHoursAvailed2}h</td>
                <td>{enggAvailedBlocksCount2}</td>
                <td>{enggTotalHoursAvailed2}h</td>

                <td>{sntAvailedBlocksCount3}</td>
                <td>{sntTotalHoursAvailed3}h</td>
                <td>{trdAvailedBlocksCount3}</td>
                <td>{trdTotalHoursAvailed3}h</td>
                <td>{enggAvailedBlocksCount3}</td>
                <td>{enggTotalHoursAvailed3}h</td>
                <td>{totalA}</td>
                <td>{Math.floor(DurationA/60)}</td>
              </tr>
              <tr>
                <td rowSpan=""></td>
                <td>Demanded</td>
                <td>{sntBlocksCount}</td>
                <td>{sntTotalHoursDemanded}h</td>
                <td>{trdBlocksCount}</td>
                <td>{trdTotalHoursDemanded}h</td>
                <td>{enggBlocksCount}</td>
                <td>{enggTotalHoursDemanded}h</td>

                <td>{sntBlocksCount2}</td>
                <td>{sntTotalHoursDemanded2}h</td>
                <td>{trdBlocksCount2}</td>
                <td>{trdTotalHoursDemanded2}h</td>
                <td>{enggBlocksCount2}</td>
                <td>{enggTotalHoursDemanded2}h</td>

                <td>{sntBlocksCount3}</td>
                <td>{sntTotalHoursDemanded3}h</td>
                <td>{trdBlocksCount3}</td>
                <td>{trdTotalHoursDemanded3}h</td>
                <td>{enggBlocksCount3}</td>
                <td>{enggTotalHoursDemanded3}h</td>
                <td>{totalD}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </>
    );
  };
  
  
  
  
  
  
  

  const uniqueDates = getUniqueDates(lines);

  return (
    <div>
      <div className="table-container">
      <table className="table is-fullwidth is-bordered ">
        <thead>
          <tr>
            <th>Date</th>
            <th colSpan="2">Particulars</th>
            <th colSpan="6">OpenLine</th>
            <th colSpan="6">RVNL</th>
            <th colSpan="6">Construction</th>
            <th colSpan="3" rowSpan="1">Total</th>
          </tr>
          <tr>
            <th></th>
            <th colSpan="2"></th>
            <th colSpan="2">S&T</th>
            <th colSpan="2">OHE</th>
            <th colSpan="2">Engg</th>
            <th colSpan="2">S&T</th>
            <th colSpan="2">OHE</th>
            <th colSpan="2">Engg</th>
            <th colSpan="2">S&T</th>
            <th colSpan="2">OHE</th>
            <th colSpan="2">Engg</th>
          </tr>
          <tr>
            <th></th>
            <th colSpan="2"></th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>No.Blocks</th>
            <th>BlockHours</th>
            <th>Total Blocks</th>
            <th>Total BlockHours</th>
          </tr>
        </thead>
        <tbody>
          {renderBlockData(lines, uniqueDates)}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default SummaryPage;
