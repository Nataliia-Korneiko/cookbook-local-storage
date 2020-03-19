import React from 'react';
import PropTypes from 'prop-types';
import s from './Legend.module.css';

const Legend = ({ items }) => (
  <ul className={s.recipes__list}>
    {items.map(item => (
      <li key={item.level} className={s.recipes__item}>
        <i
          className="material-icons"
          style={{ color: item.color, paddingRight: '6px' }}
        >
          assignment
        </i>
        {item.level}
      </li>
    ))}
  </ul>
);

Legend.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Legend;
