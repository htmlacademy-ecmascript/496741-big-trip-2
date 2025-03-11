import { createElement } from '../render';

function createItemSortTemplate() {
  return `<div class="trip-sort__item  trip-sort__item--day">
            <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
            <label class="trip-sort__btn" for="sort-day">Day</label>
          </div>`;
}

export default class ItemSortView {
  getTemplate() {
    return createItemSortTemplate();
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
