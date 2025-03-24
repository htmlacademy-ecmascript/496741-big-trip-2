import { createElement } from '../render.js';

function createButtonFilterTemplate() {
  return '<button class="visually-hidden" type="submit">Accept filter</button>';
}

export default class ButtonFilterView {
  getTemplate() {
    return createButtonFilterTemplate();
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
