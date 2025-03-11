import { createElement } from '../render';

function createListTripTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListTripView {
  getTemplate() {
    return createListTripTemplate();
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
