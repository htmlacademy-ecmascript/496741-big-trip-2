import AbstractView from '../framework/view/abstract-view.js';

function createListTripTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListTripView extends AbstractView {
  get template() {
    return createListTripTemplate();
  }
}
