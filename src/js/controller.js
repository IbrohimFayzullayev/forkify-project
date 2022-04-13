const { async } = require('regenerator-runtime');

import { loadRecipe, searchResults, state } from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.loadingSpinner();

    await loadRecipe(id);

    const data = state.recipe;

    recipeView.render(data);
  } catch (err) {
    recipeView.setError();
    throw err;
  }
};

const searchController = async function () {
  const inputValue = searchView.getQuery();

  await searchResults(inputValue);

  const data = state.search.results;
  resultsView.render(data);
};

searchView.addHandlerEvent(searchController);

recipeView.addHandlerEvent(showRecipe);

// controller ichidagi funksiyani view ga berish usuli
// shu usulda malumot berib yuborsak boladi

// ['hashchange', 'load'].forEach(val => window.addEventListener(val, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
