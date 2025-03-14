import { createElement } from '../render';

function createFailedLoadTemplate() {
  return '<p class="trip-events__msg">Failed to load latest route information</p>';
}

export default class FailedLoadView {
  getTemplate() {
    return createFailedLoadTemplate();
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
