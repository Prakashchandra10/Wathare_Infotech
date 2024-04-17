import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const FilterForm = ({ onDataFiltered }) => {
  const [startTime, setStartTime] = useState('');
  const [frequency, setFrequency] = useState('1-hour'); // Default frequency

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/filter-data/${frequency}?startTime=${startTime}`);
      onDataFiltered(response.data.filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleFilter}>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(moment(e.target.value).toISOString())} // Convert to ISO format
      />
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="1-hour">1 Hour</option>
        <option value="8-hour">8 Hours</option>
        <option value="24-hour">24 Hours</option>
      </select>
      <button type="submit">Filter Data</button>
    </form>
  );
};

export default FilterForm;
