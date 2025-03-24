import { createElement } from '../render.js';
import { FILTERS } from '../const.js';

function createItemsFilterTemplate() {
  return FILTERS.map((filter) => `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}">
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('');
}

function createListFilterTemplate() {
  const itemsFilterTemplate = createItemsFilterTemplate();

  return `<form class="trip-filters" action="#" method="get">${itemsFilterTemplate}</form>`;
}

export default class ListFilterView {
  getTemplate() {
    return createListFilterTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
