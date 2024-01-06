import React from 'react';

const SearchAI = ({ onOptionSelect }) => {
  const inputStyle = {
    width: '100%', 
    border: 'none', 
    outline: 'none', 
    padding: '8px', // Add some padding for spacing
    boxSizing: 'border-box', // Include padding and border in the width
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ask me anything...."
        style={inputStyle}
      />
    </div>
  );
};
export default SearchAI;
