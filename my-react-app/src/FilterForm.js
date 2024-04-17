// FilterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FilterForm = ({ onFilter }) => {
  const [startTime, setStartTime] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/filter-data/${frequency}?startTime=${startTime}`);
      onFilter(response.data.filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
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
