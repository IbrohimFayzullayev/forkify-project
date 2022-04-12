const { async } = require('regenerator-runtime');
import icons from '../img/icons.svg'; // Parcel 1-versiya
// import icons from 'url:../img/icons.svg'; // Parcel 2- versiya
// console.log(icons);
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const data = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const dataJSON = await data.json();
    const obj = dataJSON.data.recipe;
    const state = {
      id: obj.id,
      time: obj.cooking_time,
      publisher: obj.publisher,
      title: obj.title,
      servings: obj.servings,
      source_url: obj.source_url,
      ingredients: obj.ingredients,
      image: obj.image_url,
    };
    recipeContainer.innerHTML = '';
    renderHTML(state);
  } catch (err) {
    alert(err);
  }
};
const renderIng = function (ings) {
  return ings.map(
    val => `<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${val.quantity || ''}</div>
  <div class="recipe__description">
    <span class="recipe__unit">${val.unit}</span>
    ${val.description}
  </div>
</li>`
  );
};
// showRecipe();

const renderHTML = function (data) {
  const html = `<figure class="recipe__fig">
  <img src="${data.image}" alt="Tomato" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${data.title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${
      data.time
    }</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
  ${renderIng(data.ingredients).join('')}
   
  </ul>
</div>

<div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">${data.publisher}</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="${data.source_url}"
    target="_blank"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </a>
</div>`;
  recipeContainer.insertAdjacentHTML('afterbegin', html);
};
['hashchange', 'load'].forEach(val => window.addEventListener(val, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);