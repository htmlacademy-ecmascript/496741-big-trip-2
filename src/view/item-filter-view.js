import { createElement } from '../render';

function createItemFilterTemplate() {
  return `<div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>`;
}

export default class ItemFilterView {
  getTemplate() {
    return createItemFilterTemplate();
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
