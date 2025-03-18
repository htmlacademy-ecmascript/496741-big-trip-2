import { createElement } from '../render';

function createItemSortTemplate(sortElement) {
  return `<div class="trip-sort__item  trip-sort__item--${sortElement}">
            <input id="sort-${sortElement}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortElement}">
            <label class="trip-sort__btn" for="sort-${sortElement}">${sortElement}</label>
          </div>`;
}

export default class ItemSortView {
  constructor({sortElement}) {
    this.sortElement = sortElement;
  }

  getTemplate() {
    return createItemSortTemplate(this.sortElement);
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
