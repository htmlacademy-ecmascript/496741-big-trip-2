import AbstractView from '../framework/view/abstract-view.js';

function createButtonFilterTemplate() {
  return '<button class="visually-hidden" type="submit">Accept filter</button>';
}

export default class ButtonFilterView extends AbstractView {
  get template() {
    return createButtonFilterTemplate();
  }
}
