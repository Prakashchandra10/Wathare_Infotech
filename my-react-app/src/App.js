// App.js
import React, { useState } from 'react';
import axios from 'axios';
import FilterForm from './FilterForm';
import DataDisplay from './DataDisplay';

const App = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (data) => {
    setFilteredData(data);
  };

  return (
    <div>
      <h1>Data Filtering App</h1>
      <FilterForm onFilter={handleFilter} />
      <DataDisplay data={filteredData} />
    </div>
  );
};

export default App;
