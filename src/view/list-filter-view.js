import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

function createItemsFilterTemplate() {
  return Object.values(FilterType).map((filter) => `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}">
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('');
}

function createListFilterTemplate() {
  const itemsFilterTemplate = createItemsFilterTemplate();

  return `<form class="trip-filters" action="#" method="get">${itemsFilterTemplate}</form>`;
}

export default class ListFilterView extends AbstractView {
  get template() {
    return createListFilterTemplate();
  }
}
