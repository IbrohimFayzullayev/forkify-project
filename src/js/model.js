import { API_URL, RES_PER_PAGE } from './config.js';
import { getJson } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '', // bu keyinchalik ishlatiladi statistika uchun sorovlarni saqlash uchun
    results: {}, // bu array
    page: 1, // bu default holatda nechinchi page chiqarishi
    perPage: RES_PER_PAGE, // page step
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(API_URL + id);
    const obj = data.data.recipe;
    state.recipe = {
      id: obj.id,
      time: obj.cooking_time,
      publisher: obj.publisher,
      title: obj.title,
      servings: obj.servings,
      source_url: obj.source_url,
      ingredients: obj.ingredients,
      image: obj.image_url,
    };
  } catch (err) {
    throw err;
  }
};

export const searchResults = async function (searchKey) {
  try {
    const data = await getJson(API_URL + `?search=${searchKey}`);
    const getArr = data.data.recipes;

    state.search.query = searchKey;

    state.search.results = getArr.map(val => {
      return {
        id: val.id,
        image: val.image_url,
        publisher: val.publisher,
        title: val.title,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const paginationLogic = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.perPage;
  const end = page * state.search.perPage;
  return state.search.results.slice(start, end);
};
