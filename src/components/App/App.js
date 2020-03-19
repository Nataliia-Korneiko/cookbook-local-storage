/* eslint-disable no-console */
import React, { Component } from 'react';
import RecipeEditor from '../RecipeEditor/RecipeEditor';
import RecipeList from '../RecipeList/RecipeList';
import RecipeFilter from '../RecipeFilter/RecipeFilter';
import Modal from '../Modal/Modal';
import Legend from '../Legend/Legend';
import Level from '../../utils/Level';
import * as API from '../../services/recipes-api';
import s from './App.module.css';

const moment = require('moment');

const filterRecipes = (recipes, filter) => {
  return recipes.filter(recipe =>
    recipe.text.toLowerCase().includes(filter.toLowerCase()),
  );
};

const legendOptions = [
  { level: Level.LOW, color: '#4caf50' },
  { level: Level.NORMAL, color: '#2196f3' },
  { level: Level.HIGH, color: '#f44336' },
];

export default class App extends Component {
  state = {
    recipes: [],
    filter: '',
    isCreating: false,
    isEditing: false,
    selectedRecipeId: null,
  };

  /* Get recipes */
  componentDidMount() {
    API.fetchRecipes()
      .then(recipes => {
        this.setState({ recipes });
        localStorage.setItem('recipes', JSON.stringify(recipes));
      })
      .catch(() => {
        const recipes = localStorage.getItem('recipes');
        if (recipes) {
          this.setState({ recipes: JSON.parse(recipes) });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { recipes } = this.state;

    if (prevState.recipes !== recipes) {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  /* Create recipe */
  openCreateRecipeModal = () => {
    this.setState({ isCreating: true });
  };

  closeCreateRecipeModal = () => {
    this.setState({ isCreating: false });
  };

  // ------ v1 --------
  // addRecipe = recipe => {
  //   const recipeToAdd = {
  //     ...recipe,
  //     createDate: moment().format('MMMM Do YYYY, h:mm:ss A'),
  //   };

  //   API.postRecipe(recipeToAdd)
  //     .then(addedRecipe => {
  //       this.setState(state => ({
  //         recipes: [...state.recipes, addedRecipe],
  //       }));
  //     })
  //     .finally(this.closeCreateRecipeModal);
  // };

  // ------ v2 --------
  // 1. Добавить рецепт в стейт
  // 2. Взять рецепт со стейта и положить в Local Storage
  // 3. Сохранить рецепт на сервере

  // addRecipe = recipe => {
  //   const recipeToAdd = {
  //     ...recipe,
  //     createDate: moment().format('MMMM Do YYYY, h:mm:ss A'),
  //   };

  //   this.setState(state => ({
  //     recipes: [...state.recipes, recipeToAdd],
  //   }));

  //   const { recipes } = this.state;
  //   localStorage.setItem('recipes', JSON.stringify(recipes));

  //   API.postRecipe(recipeToAdd)
  //     .then()
  //     .catch(error => {
  //       console.error(error);
  //     })
  //     .finally(this.closeCreateRecipeModal);
  // };

  // ------ v3 --------
  // 1. Добавить рецепт в стейт
  // 2. Взять рецепт со стейта и положить в Local Storage
  // 3. Сохранить рецепт на сервере

  addRecipe = recipe => {
    const recipeToAdd = {
      ...recipe,
      createDate: moment().format('MMMM Do YYYY, h:mm:ss A'),
    };

    this.setState(
      state => ({
        recipes: [...state.recipes, recipeToAdd],
      }),
      () => {
        const { recipes } = this.state;
        console.log(recipes);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        API.postRecipe(recipeToAdd)
          .then(() => console.log('server work'))
          .catch(error => {
            console.error(error);
            console.log('server do not work');
          })
          .finally(this.closeCreateRecipeModal);
      },
    );
  };

  /* Delete recipe */
  deleteRecipe = id => {
    API.deleteRecipe(id).then(() => {
      this.setState(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id),
      }));
    });
  };

  /* Update recipe */
  openEditRecipeModal = id => {
    this.setState({
      isEditing: true,
      selectedRecipeId: id,
    });
  };

  closeEditRecipeModal = () => {
    this.setState({
      isEditing: false,
      selectedRecipeId: null,
    });
  };

  updateRecipe = ({ text, description, level }) => {
    API.updateRecipe(this.state.selectedRecipeId, {
      text,
      description,
      level,
      editDate: moment().format('MMMM Do YYYY, h:mm:ss A'),
    }).then(updateRecipe => {
      this.setState(
        state => ({
          recipes: state.recipes.map(recipe =>
            recipe.id === state.selectedRecipeId ? updateRecipe : recipe,
          ),
        }),
        this.closeEditRecipeModal,
      );
    });
  };

  render() {
    const {
      recipes,
      filter,
      isCreating,
      isEditing,
      selectedRecipeId,
    } = this.state;
    const filteredRecipes = filterRecipes(recipes, filter);
    const recipeInEdit = recipes.find(r => r.id === selectedRecipeId);

    return (
      <div>
        <header className={s.recipes__header}>
          <div className={s.container}>
            <button
              className={s.recipes__button}
              type="button"
              onClick={this.openCreateRecipeModal}
            >
              Add recipe
            </button>
            <div className={s.recipes__quote}>
              <p className={s.recipes__description}>
                &#34; It is important to experiment and endlessly seek after
                creating the best possible flavours when preparing foods. That
                means not being afraid to experiment with various
                ingredients.&#34;
              </p>
              <p className={s.recipes__author}>Rocco DiSpirito</p>
            </div>
          </div>
        </header>

        <main className={s.recipes__main}>
          <div className={s.container}>
            <div className={s.recipes__wrapper}>
              <RecipeFilter value={filter} onChangeFilter={this.changeFilter} />
              <Legend items={legendOptions} />
            </div>
            <RecipeList
              items={filteredRecipes}
              onDeleteRecipe={this.deleteRecipe}
              onEditRecipe={this.openEditRecipeModal}
            />
            {isCreating && (
              <Modal onClose={this.closeCreateRecipeModal}>
                <RecipeEditor
                  onSave={this.addRecipe}
                  onCancel={this.closeCreateRecipeModal}
                />
              </Modal>
            )}
            {isEditing && (
              <Modal onClose={this.closeEditRecipeModal}>
                <RecipeEditor
                  onSave={this.updateRecipe}
                  onCancel={this.closeEditRecipeModal}
                  text={recipeInEdit.text}
                  description={recipeInEdit.description}
                  level={recipeInEdit.level}
                  createDate={recipeInEdit.createDate}
                  editDate={recipeInEdit.editDate}
                />
              </Modal>
            )}
          </div>
        </main>
      </div>
    );
  }
}
