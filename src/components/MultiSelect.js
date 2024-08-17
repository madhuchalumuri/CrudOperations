// MultiSelect.js
import React, { useState } from 'react';
// import './MultiSelect.css'; // Import some basic CSS for styling

const MultiSelect = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    onChange(newSelectedOptions);
  };

  const handleRemoveSelectedOption = (option) => {
    const newSelectedOptions = selectedOptions.filter((selected) => selected !== option);
    onChange(newSelectedOptions);
  };

  return (
    <div className="multi-select">
      <div className="select-box" onClick={() => setIsOpen(!isOpen)}>
        {selectedOptions.length === 0 ? 'Select options' : (
          <div className="selected-options">
            {selectedOptions.map(option => (
              <span key={option} className="selected-option">
                {option}
                <button
                  className="remove-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSelectedOption(option);
                  }}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
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

export default MultiSelect;
