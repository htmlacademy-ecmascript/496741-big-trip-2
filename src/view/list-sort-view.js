import { SORTING_ELEMENTS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createItemsSortTemplate() {
  return SORTING_ELEMENTS.map((sortElement) => `<div class="trip-sort__item  trip-sort__item--${sortElement}">
    <input
      id="sort-${sortElement}"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${sortElement}"
    >
    <label
      class="trip-sort__btn"
      for="sort-${sortElement}"
      data-sort-type="${sortElement}"
    >${sortElement}</label>
  </div>`).join('');
}

function createListSortTemplate() {
  const itemsSortTemplate = createItemsSortTemplate();
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${itemsSortTemplate}</form>`;
}

export default class ListSortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
