// MultiSelect.js
import React, { useState } from 'react';
import './multiplecss.css'; // Import some basic CSS for styling

const MultipleOptions = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    onChange(newSelectedOptions);
  };

  return (
    <div className="multi-select">
      <div className="select-box" onClick={() => setIsOpen(!isOpen)}>
        {selectedOptions.length === 0 ? 'Select options' : selectedOptions.join(', ')}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option}
              className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleOptions;
