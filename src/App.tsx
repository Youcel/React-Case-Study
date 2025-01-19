import React, { useState } from 'react';
import './style.css';
import Grid from './grid';
import dataList from './data.json';

export default function App() {
  const [today, setToday] = useState(new Date()); 
  const [limit, setLimit] = useState(5); 
  const [result, setResult] = useState(0); 
  const [miscoloredRows, setMiscoloredRows] = useState<string[]>([]);  

  function control(today: Date, limit: number): { count: number, miscoloredNames: string[] } {
  
    const rows = document.querySelectorAll('tbody tr');  
    let miscoloredRows = 0;
    
    const miscoloredNames: string[] = []; 
    rows.forEach((row, index) => { 
      const cells = row.querySelectorAll('td'); 

      const mailReceivedDate = new Date(cells[1]?.textContent?.trim() || '');
      const solutionSentDate =
        cells[2]?.textContent?.trim() && cells[2]?.textContent?.trim() !== '-'
          ? new Date(cells[2]?.textContent?.trim())
          : today;

      if (isNaN(mailReceivedDate.getTime()) || isNaN(solutionSentDate.getTime())) {
        return;
      }

      const dayDifference = Math.ceil(
        Math.abs(solutionSentDate.getTime() - mailReceivedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const computedStyle = window.getComputedStyle(row);
      const isBackgroundRed = computedStyle.backgroundColor === 'rgb(255, 0, 0)';

      const rowName = cells[0]?.textContent?.trim();

      if ((isBackgroundRed && dayDifference <= limit) || (!isBackgroundRed && dayDifference > limit)) {
        miscoloredRows++;
        if (rowName) miscoloredNames.push(rowName);
      }
    });

    return { count: miscoloredRows, miscoloredNames };
  }

  const handleCheck = () => {
    const { count, miscoloredNames } = control(today, limit);
    setResult(count);
    setMiscoloredRows(miscoloredNames); 
  };

  return (
    <div>
      <h1>Dgpays Case Study</h1>
      <Grid source={dataList} />
      <div style={{ marginTop: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Today : 
          <input
            type="date"
            onChange={(e) => setToday(new Date(e.target.value))}
            value={today.toISOString().split('T')[0]}
            style={{ marginLeft: '5px' }} 
          />
        </label>
        <label style={{ marginRight: '40px' }}>
          Limit :
          <input
            type="number"
            onChange={(e) => setLimit(parseInt(e.target.value))}
            value={limit}
          />
        </label>
        <button onClick={handleCheck}>Check Miscolored Rows</button>
      </div>
      <p>Miscolored Rows Count: {result}</p>
      {miscoloredRows.length > 0 && (
        <div>
          <h3 style={{ fontWeight: 'normal', display: 'inline', fontSize: '1rem' }}>Miscolored Rows Name: </h3>
          <span>{miscoloredRows.join(', ')}</span> 
        </div>
      )}
    </div>
  );
}
