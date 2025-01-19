import React from 'react';

interface GridProps {
  source: Array<{
    name: string;
    mailReceivedDate: string;
    solutionSentDate?: string;
    isBackgroundColorRed?: boolean;
  }>;
}

const Grid: React.FC<GridProps> = ({ source }) => {
  console.log('Grid Source Data:', source);
  return (
    <table style={{ borderCollapse: 'collapse', width: '30%' }}>
      <tbody>
        {source.map((row, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: row.isBackgroundColorRed ? 'red' : 'white',
            }}
          >
            <td style={{
              padding: '5px',
              borderBottom: '2px solid white',  
              borderRight: '2px solid white',  
              textAlign: 'left', 
            }}>
              {row.name}
            </td>
            <td style={{
              padding: '5px',
              borderBottom: '2px solid white',  
              borderRight: '2px solid white',  
              textAlign: 'left', 
               
            }}>
              {row.mailReceivedDate}
            </td>
            <td style={{
              padding: '5px',
              borderBottom: '2px solid white',  
              textAlign: row.solutionSentDate ? 'left' : 'center', 
            }}>
              {row.solutionSentDate || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
