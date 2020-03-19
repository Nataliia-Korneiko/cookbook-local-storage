import React from 'react';
import PropTypes from 'prop-types';

const LevelSelector = ({ options, value, onChange }) => (
  <select name="level" value={value} onChange={onChange}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

LevelSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LevelSelector;
