import { createElement } from '../render';

function createItemTripTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class ItemTripView {
  getTemplate() {
    return createItemTripTemplate();
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
