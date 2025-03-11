import { render } from '../render';
import ListSortView from '../view/list-sort-view';
import ItemSortView from '../view/item-sort-view';
import ListTripView from '../view/list-trip';
import ItemTripView from '../view/item-trip';
import EventView from '../view/event-view';
import EditPointView from '../view/edit-point-view';
import AddNewPointView from '../view/add-new-point-view';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

export default class BoardPresenter {
  listSortComponent = new ListSortView();
  listTripComponent = new ListTripView();
  itemTripComponent = new ItemTripView();
  secondItemTripComponent = new ItemTripView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.listSortComponent, tripEventsElement);
    for (let i = 0; i < 5; i++) {
      render(new ItemSortView(), this.listSortComponent.getElement());
    }
    render(this.listTripComponent, tripEventsElement);
    render(this.itemTripComponent, this.listTripComponent.getElement());
    render(new AddNewPointView, this.itemTripComponent.getElement());
    render(this.secondItemTripComponent, this.listTripComponent.getElement());
    render(new EditPointView, this.secondItemTripComponent.getElement());
    for (let i = 0; i < 7; i++) {
      const newItemTripComponent = new ItemTripView();
      render(newItemTripComponent, this.listTripComponent.getElement());
      render(new EventView, newItemTripComponent.getElement());
    }
  }
}
