import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { exportTableToExcel } from './exportTableToExcel';

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
    
   

    const timeConvert = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
    };
      

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
              (line.Department === 'SnT' && line.blockDurationAvailed && line.status === 'OpenLine' ? 1 : 0),
            0
          );
          const trdGrantedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockDurationAvailed && line.status === 'OpenLine' ? 1 : 0),
            0
          );
          const enggGrantedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockDurationAvailed && line.status === 'OpenLine' ? 1 : 0),
            0
          );
  
          const sntAvailedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'OpenLine' ? 1 : 0),
            0
          );
          const trdAvailedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'OpenLine' ? 1 : 0),
            0
          );
          const enggAvailedBlocksCount = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'OpenLine' ? 1 : 0),
            0
          );
  
          const sntTotalDurationGranted = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'OpenLine'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const trdTotalDurationGranted = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'OpenLine'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const enggTotalDurationGranted = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'OpenLine'
                ? line.blockGrantedDuration
                : 0),
            0
          );
  
          const sntTotalDurationAvailed = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDurationAvailed && line.status === 'OpenLine'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const trdTotalDurationAvailed = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDurationAvailed && line.status === 'OpenLine'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const enggTotalDurationAvailed = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDurationAvailed && line.status === 'OpenLine'
                ? line.blockDurationAvailed
                : 0),
            0
          );
  
          const sntTotalDurationDemanded = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'OpenLine'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const trdTotalDurationDemanded = filteredLines.reduce(
            (total, line) =>
              total +
              ((line.Department === 'Trd' && line.blockDemandedDuration) && line.status === 'OpenLine'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const enggTotalDurationDemanded = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'OpenLine'
                ? line.blockDemandedDuration
                : 0),
            0
          );
  
          const sntTotalHoursGranted =(sntTotalDurationGranted ); 
          const trdTotalHoursGranted =(trdTotalDurationGranted ); 
          const enggTotalHoursGranted =(enggTotalDurationGranted ); 
  
          const sntTotalHoursAvailed =(sntTotalDurationAvailed ); 
          const trdTotalHoursAvailed =(trdTotalDurationAvailed ); 
          const enggTotalHoursAvailed =(enggTotalDurationAvailed ); 
  
          const sntTotalHoursDemanded =(sntTotalDurationDemanded ); 
          const trdTotalHoursDemanded =(trdTotalDurationDemanded ); 
          const enggTotalHoursDemanded =(enggTotalDurationDemanded ); 
         
          const sntBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'Construction' ? 1 : 0),
            0
          );
          const trdBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'Construction' ? 1 : 0),
            0
          );
          const enggBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'Construction' ? 1 : 0),
            0
          );
  
          const sntGrantedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' | line.blockDurationAvailed && line.status === 'Construction' ? 1 : 0),
            0
          );
          const trdGrantedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' | line.blockDurationAvailed && line.status === 'Construction' ? 1 : 0),
            0
          );
          const enggGrantedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' | line.blockDurationAvailed && line.status === 'Construction' ? 1 : 0),
            0
          );
  
          const sntAvailedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'Construction' ? 1 : 0),
            0
          );
          const trdAvailedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'Construction' ? 1 : 0),
            0
          );
          const enggAvailedBlocksCount3 = filteredLines.reduce(
            (count, line) =>
              count +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'Construction' ? 1 : 0),
            0
          );
  
          const sntTotalDurationGranted3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockGrantedDuration && line.status === 'Construction'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const trdTotalDurationGranted3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockGrantedDuration && line.status === 'Construction'
                ? line.blockGrantedDuration
                : 0),
            0
          );
          const enggTotalDurationGranted3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockGrantedDuration && line.status === 'Construction'
                ? line.blockGrantedDuration
                : 0),
            0
          );
  
          const sntTotalDurationAvailed3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDurationAvailed && line.status === 'Construction'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const trdTotalDurationAvailed3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDurationAvailed && line.status === 'Construction'
                ? line.blockDurationAvailed
                : 0),
            0
          );
          const enggTotalDurationAvailed3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDurationAvailed && line.status === 'Construction'
                ? line.blockDurationAvailed
                : 0),
            0
          );
  
          const sntTotalDurationDemanded3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'SnT' && line.blockDemandedDuration && line.status === 'Construction'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const trdTotalDurationDemanded3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Trd' && line.blockDemandedDuration && line.status === 'Construction'
                ? line.blockDemandedDuration
                : 0),
            0
          );
          const enggTotalDurationDemanded3 = filteredLines.reduce(
            (total, line) =>
              total +
              (line.Department === 'Engg' && line.blockDemandedDuration && line.status === 'Construction'
                ? line.blockDemandedDuration
                : 0),
            0
          );
  
          const sntTotalHoursGranted3 =(sntTotalDurationGranted3 ); 
          const trdTotalHoursGranted3 =(trdTotalDurationGranted3 ); 
          const enggTotalHoursGranted3 =(enggTotalDurationGranted3 ); 
  
          const sntTotalHoursAvailed3 =(sntTotalDurationAvailed3 ); 
          const trdTotalHoursAvailed3 =(trdTotalDurationAvailed3 ); 
          const enggTotalHoursAvailed3 =(enggTotalDurationAvailed3 ); 
  
          const sntTotalHoursDemanded3 =(sntTotalDurationDemanded3 ); 
          console.log(sntTotalDurationDemanded3)
          const trdTotalHoursDemanded3 =(trdTotalDurationDemanded3 );
          console.log(trdTotalDurationDemanded3) 
          const enggTotalHoursDemanded3 =(enggTotalDurationDemanded3 );
          console.log(enggTotalHoursDemanded3) 

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
              ((line.Department === 'SnT'  || line.blockDurationAvailed) && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const trdGrantedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              ((line.Department === 'Trd' || line.blockDurationAvailed) && line.status === 'RVNL' ? 1 : 0),
            0
          );
          const enggGrantedBlocksCount2 = filteredLines.reduce(
            (count, line) =>
              count +
              ((line.Department === 'Engg' || line.blockDurationAvailed) && line.status === 'RVNL' ? 1 : 0),
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
  
          const sntTotalHoursGranted2 =(sntTotalDurationGranted2 ); 
          const trdTotalHoursGranted2 =(trdTotalDurationGranted2 ); 
          const enggTotalHoursGranted2 =(enggTotalDurationGranted2 ); 
  
          const sntTotalHoursAvailed2 =(sntTotalDurationAvailed2 ); 
          const trdTotalHoursAvailed2 =(trdTotalDurationAvailed2 ); 
          const enggTotalHoursAvailed2 =(enggTotalDurationAvailed2 ); 
  
          const sntTotalHoursDemanded2 =(sntTotalDurationDemanded2 ); 
          const trdTotalHoursDemanded2 =(trdTotalDurationDemanded2 ); 
          const enggTotalHoursDemanded2 =(enggTotalDurationDemanded2 ); 

          const totalA = sntAvailedBlocksCount + trdAvailedBlocksCount + enggAvailedBlocksCount +sntAvailedBlocksCount2 + trdAvailedBlocksCount2 + enggAvailedBlocksCount2 + sntAvailedBlocksCount3 + trdAvailedBlocksCount3 + enggAvailedBlocksCount3;
          const totalG = sntGrantedBlocksCount + trdGrantedBlocksCount + enggGrantedBlocksCount + sntGrantedBlocksCount2 + trdGrantedBlocksCount2 + enggGrantedBlocksCount2 + sntGrantedBlocksCount3 + trdGrantedBlocksCount3 + enggGrantedBlocksCount3; 
          const totalD = sntBlocksCount + trdBlocksCount + enggBlocksCount + sntBlocksCount2 + trdBlocksCount2 + enggBlocksCount2 + sntBlocksCount3 + trdBlocksCount3 + enggBlocksCount3;

          const DurationA = parseInt(sntTotalDurationAvailed) + parseInt(trdTotalDurationAvailed) + parseInt(enggTotalDurationAvailed) + parseInt(sntTotalDurationAvailed2) + parseInt(trdTotalDurationAvailed2) + parseInt(enggTotalDurationAvailed2) + parseInt(sntTotalDurationAvailed3) + parseInt(trdTotalDurationAvailed3) + parseInt(enggTotalDurationAvailed3);
          const DurationG = parseInt(sntTotalDurationGranted) + parseInt(trdTotalDurationGranted) + parseInt(enggTotalHoursGranted) + parseInt(sntTotalDurationGranted2) + parseInt(trdTotalDurationGranted2) + parseInt(enggTotalHoursGranted2) + parseInt(sntTotalDurationGranted3) + parseInt(trdTotalDurationGranted3) + parseInt(enggTotalHoursGranted3);
          const DurationD = parseInt(sntTotalDurationDemanded) + parseInt(trdTotalDurationDemanded) + parseInt(enggTotalDurationDemanded) + parseInt(sntTotalDurationDemanded2) + parseInt(trdTotalDurationDemanded2) + parseInt(enggTotalDurationDemanded2) + parseInt(sntTotalDurationDemanded3) + parseInt(trdTotalDurationDemanded3) + parseInt(enggTotalDurationDemanded3);
          return (
            <React.Fragment key={date}>
              <tr>
                <td rowSpan="4">{formatDate(date)}</td>
              </tr>
              <tr>
                <td rowSpan=""></td>
                <td>Granted</td>
                <td>{sntGrantedBlocksCount}</td>
                <td>{timeConvert(sntTotalHoursGranted)}h</td>
                <td>{trdGrantedBlocksCount}</td>
                <td>{timeConvert(trdTotalHoursGranted)}h</td>
                <td>{enggGrantedBlocksCount}</td>
                <td>{timeConvert(enggTotalHoursGranted)}h</td>
          
                <td>{sntGrantedBlocksCount2}</td>
                <td>{timeConvert(sntTotalHoursGranted2)}h</td>
                <td>{trdGrantedBlocksCount2}</td>
                <td>{timeConvert(trdTotalHoursGranted2)}h</td>
                <td>{enggGrantedBlocksCount2}</td>
                <td>{timeConvert(enggTotalHoursGranted2)}h</td>

                <td>{sntGrantedBlocksCount3}</td>
                <td>{timeConvert(sntTotalHoursGranted3)}h</td>
                <td>{trdGrantedBlocksCount3}</td>
                <td>{timeConvert(trdTotalHoursGranted3)}h</td>
                <td>{enggGrantedBlocksCount3}</td>
                <td>{timeConvert(enggTotalHoursGranted3)}h</td>
                <td>{totalG}</td>
                <td>{timeConvert(DurationG)}</td>
                
              </tr>
              <tr>
                <td rowSpan=""></td>
                <td>Availed</td>
                <td>{sntAvailedBlocksCount}</td>
                <td>{timeConvert(sntTotalHoursAvailed)}h</td>
                <td>{trdAvailedBlocksCount}</td>
                <td>{timeConvert(trdTotalHoursAvailed)}h</td>
                <td>{enggAvailedBlocksCount}</td>
                <td>{timeConvert(enggTotalHoursAvailed)}h</td>
                
                <td>{sntAvailedBlocksCount2}</td>
                <td>{timeConvert(sntTotalHoursAvailed2)}h</td>
                <td>{trdAvailedBlocksCount2}</td>
                <td>{timeConvert(trdTotalHoursAvailed2)}h</td>
                <td>{enggAvailedBlocksCount2}</td>
                <td>{timeConvert(enggTotalHoursAvailed2)}h</td>

                <td>{sntAvailedBlocksCount3}</td>
                <td>{timeConvert(sntTotalHoursAvailed3)}h</td>
                <td>{trdAvailedBlocksCount3}</td>
                <td>{timeConvert(trdTotalHoursAvailed3)}h</td>
                <td>{enggAvailedBlocksCount3}</td>
                <td>{timeConvert(enggTotalHoursAvailed3)}h</td>
                <td>{totalA}</td>
                <td>{timeConvert(DurationA)}</td>
              </tr>
              <tr>
                <td rowSpan=""></td>
                <td>Demanded</td>
                <td>{sntBlocksCount}</td>
                <td>{timeConvert(sntTotalHoursDemanded)}h</td>
                <td>{trdBlocksCount}</td>
                <td>{timeConvert(trdTotalHoursDemanded)}h</td>
                <td>{enggBlocksCount}</td>
                <td>{timeConvert(enggTotalHoursDemanded)}h</td>

                <td>{sntBlocksCount2}</td>
                <td>{timeConvert(sntTotalHoursDemanded2)}h</td>
                <td>{trdBlocksCount2}</td>
                <td>{timeConvert(trdTotalHoursDemanded2)}h</td>
                <td>{enggBlocksCount2}</td>
                <td>{timeConvert(enggTotalHoursDemanded2)}h</td>

                <td>{sntBlocksCount3}</td>
                <td>{timeConvert(sntTotalHoursDemanded3)}h</td>
                <td>{trdBlocksCount3}</td>
                <td>{timeConvert(trdTotalHoursDemanded3)}h</td>
                <td>{enggBlocksCount3}</td>
                <td>{timeConvert(enggTotalHoursDemanded3)}h</td>
                <td>{totalD}</td>
                <td>{timeConvert(DurationD)}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </>
    );
  };
  
  
  
  
  
  
  

  const uniqueDates = getUniqueDates(lines);

  const handleDownload = () => {
    exportTableToExcel('summary-table', 'summary_table'); // Call the Excel export function
  };

  return (
    <div>
      <div className="table-container">
      <table className="table is-fullwidth is-bordered " id="summary-table">
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
    <button className="button is-primary" onClick={handleDownload}>
        Download Excel
    </button>
  </div>
  );
};

export default SummaryPage;
