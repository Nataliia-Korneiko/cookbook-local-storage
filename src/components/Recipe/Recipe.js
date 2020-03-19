import React from 'react';
import PropTypes from 'prop-types';
import s from './Recipe.module.css';

const Recipe = ({
  text,
  description,
  level,
  createDate,
  editDate,
  onDeleteRecipe,
  onEdit,
}) => (
  <div className={`${s.recipe} ${s[`${level}__level`]}`}>
    <div className={s.recipe__spans}>
      <span className={`${s.recipe__span} ${s.recipe__createDate}`}>
        {createDate}
      </span>
      <span className={`${s.recipe__span} ${s.recipe__editDate}`}>
        {editDate}
      </span>
    </div>
    <div className={s.recipe__wrapper}>
      <h2 className={s.recipe__title}>{text}</h2>
      <p className={s.recipe__description}>{description}</p>
    </div>
    <div className={s.recipe__buttons}>
      <button
        className={s.recipe__button}
        type="button"
        onClick={onDeleteRecipe}
      >
        Delete
      </button>

      <button className={s.recipe__button} type="button" onClick={onEdit}>
        Edit
      </button>
    </div>
  </div>
);

Recipe.defaultProps = {
  createDate: '',
  editDate: '',
};

Recipe.propTypes = {
  text: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  createDate: PropTypes.string,
  editDate: PropTypes.string,
  onDeleteRecipe: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Recipe;
