import React from 'react';
import moment from 'moment';

const TimeScaleChart = ({ data }) => {
  // Define chart dimensions and margins
  const width = 600;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  // Calculate x position based on timestamp
  const calculateXPosition = (timestamp) => {
    const xScale = moment(timestamp).unix(); // Convert timestamp to Unix timestamp
    const xDomainMin = moment(data[0].timestamp).unix();
    const xDomainMax = moment(data[data.length - 1].timestamp).unix();
    const xRangeMin = margin.left;
    const xRangeMax = width - margin.right;
    return ((xScale - xDomainMin) / (xDomainMax - xDomainMin)) * (xRangeMax - xRangeMin) + xRangeMin;
  };

  // Calculate y position based on machine status
  const calculateYPosition = (machineStatus) => {
    const yScale = machineStatus;
    const yDomainMin = 0;
    const yDomainMax = 1; // Assuming machine status ranges from 0 to 1
    const yRangeMin = height - margin.bottom;
    const yRangeMax = margin.top;
    return ((yScale - yDomainMin) / (yDomainMax - yDomainMin)) * (yRangeMax - yRangeMin) + yRangeMin;
  };

  // Get color based on machine status and handle missing timestamps
  const getColor = (item) => {
    if (typeof item.machine_status === 'undefined') {
      return 'red'; // Render red for missing timestamps
    } else {
      return item.machine_status === 0 ? 'yellow' : 'green'; // Change colors based on machine status
    }
  };

  return (
    <svg width={width} height={height}>
      {data.map((item, index) => (
        <circle
          key={index}
          cx={calculateXPosition(item.timestamp)}
          cy={calculateYPosition(item.machine_status)}
          r={5} // Adjust the radius as needed
          fill={getColor(item)}
        />
      ))}
    </svg>
  );
};

export default TimeScaleChart;
