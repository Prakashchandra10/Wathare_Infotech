import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import FilterForm from './FilterForm';
import TimeScaleChart from './TimeScaleChart'; // Import the TimeScaleChart component

const App = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleDataFiltered = (data) => {
    setFilteredData(data);
  };

  return (
    <div>
      <h1>Data Filtering App</h1>
      <FilterForm onDataFiltered={handleDataFiltered} />
      {/* Pass the filtered data to the TimeScaleChart component */}
      <TimeScaleChart data={filteredData} />
    </div>
  );
};

export default App;
