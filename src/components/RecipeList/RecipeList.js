/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Recipe from '../Recipe/Recipe';
import s from './RecipeList.module.css';

const RecipeList = ({ items, onDeleteRecipe, onEditRecipe }) =>
  items.length > 0 && (
    <ul className={s.recipes__list}>
      {items.map(item => (
        <li className={s.recipes__item} key={item.id}>
          <Recipe
            {...item}
            onDeleteRecipe={() => onDeleteRecipe(item.id)}
            onEdit={() => onEditRecipe(item.id)}
          />
        </li>
      ))}
    </ul>
  );

RecipeList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
