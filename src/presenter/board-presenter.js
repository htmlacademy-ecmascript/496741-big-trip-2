import { render } from '../render';
import ListSortView from '../view/list-sort-view';
import ItemSortView from '../view/item-sort-view';
import ListTripView from '../view/list-trip';
import ItemTripView from '../view/item-trip';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

export default class BoardPresenter {
  listSortComponent = new ListSortView();
  listTripComponent = new ListTripView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.listSortComponent, tripEventsElement);
    for (let i = 0; i < 5; i++) {
      render(new ItemSortView(), this.listSortComponent.getElement());
    }
    render(this.listTripComponent, tripEventsElement);
    for (let i = 0; i < 9; i++) {
      render(new ItemTripView, this.listTripComponent.getElement());
    }
  }
}
