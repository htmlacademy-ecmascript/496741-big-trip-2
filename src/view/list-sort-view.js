import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createItemsSortTemplate(currentSortType) {
  return Object.keys(SortType).map((sortElement) => `<div class="trip-sort__item  trip-sort__item--${SortType[sortElement]}">
    <input
      id="sort-${SortType[sortElement]}"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${SortType[sortElement]}"
      ${SortType[sortElement] === SortType.EVENT || SortType[sortElement] === SortType.OFFERS ? 'disabled' : ''}
      ${SortType[sortElement] === currentSortType ? 'checked' : ''}
    >
    <label
      class="trip-sort__btn"
      for="sort-${SortType[sortElement]}"
      data-sort-type="${SortType[sortElement]}"
    >${SortType[sortElement]}</label>
  </div>`).join('');
}

function createListSortTemplate(currentSortType) {
  const itemsSortTemplate = createItemsSortTemplate(currentSortType);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${itemsSortTemplate}
          </form>`;
}

export default class ListSortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.closest('.trip-sort__btn') || evt.target.previousElementSibling.disabled) {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
    evt.target.previousElementSibling.checked = true;
  };
}
