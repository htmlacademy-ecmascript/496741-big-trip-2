import AbstractView from '../framework/view/abstract-view.js';

function createListItemContainerTemplate() {

  return '<li class="trip-events__item"></li>';
}

export default class ListItemContainerView extends AbstractView {

  get template() {
    return createListItemContainerTemplate();
  }
}
