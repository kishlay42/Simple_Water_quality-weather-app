import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

const SearchWater = ({ onOptionSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const loadOptions = async (inputValue) => {
    // Fetch data based on the inputValue and return suggestions
    // Replace the URL with your actual data source
    const url = `https://script.google.com/macros/s/AKfycbyQuEJsegAN9HA-MPr_L7Ldeg8K1-y6LmD2LLpWtlvR9olOyD3yklieYVwv2rgLSbEaqQ/exec?q=${inputValue}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const suggestions = data.map((entry) => ({
          value: entry,
          label: entry.StationName,
        }));
        return suggestions;
      } else {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleInputChange = (newValue) => {
    setSearchTerm(newValue);
  };

  const handleValueChange = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption.value); // Log the selected value
      // Pass the selected data to the parent component
      onOptionSelect(selectedOption);
    }
  };

  useEffect(() => {
    loadOptions(searchTerm)
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error(error);
        setSuggestions([]);
      });
  }, [searchTerm]);

  return (
    <div>
      <AsyncSelect
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleValueChange}
        placeholder="Search for station name with district"
      />
    </div>
  );
};

export default SearchWater;
