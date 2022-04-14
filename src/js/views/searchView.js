import icons from '../../img/icons.svg'; // Parcel 1-versiya

class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const val = document.querySelector('.search__field').value;
    return val;
  }

  #clearHtml() {
    document.querySelector('.search-results').innerHTML = '';
  }

  addHandlerEvent(handle) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handle();
    });
  }

  setError() {
    const html = `<div class="error">
    <div>
      <svg>
        <use href="${icons}.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>Malumot topilmadi </p>
  </div>`;
    this.#clearHtml();
    document
      .querySelector('.search-results')
      .insertAdjacentHTML('afterbegin', html);
  }
}
export default new SearchView();
