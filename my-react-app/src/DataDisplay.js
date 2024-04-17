// DataDisplay.js
import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <div>
      <h2>Filtered Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{/* Render individual data item */}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
