import AbstractView from '../framework/view/abstract-view.js';

function createItemsFilterTemplate(filters) {
  return filters.map((filter) => `<div class="trip-filters__filter">
      <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}">
      <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
    </div>`).join('');
}

function createListFilterTemplate(filters) {
  const itemsFilterTemplate = createItemsFilterTemplate(filters);

  return `<form class="trip-filters" action="#" method="get">${itemsFilterTemplate}</form>`;
}

export default class ListFilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createListFilterTemplate(this.#filters);
  }
}
