import { render } from '../render';
import ListSortView from '../view/list-sort-view';
import ItemSortView from '../view/item-sort-view';
import ListTripView from '../view/list-trip-view';
import ItemTripView from '../view/item-trip-view';
import EditPointView from '../view/edit-point-view';
import AddNewPointView from '../view/add-new-point-view';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

export default class BoardPresenter {
  listSortComponent = new ListSortView();
  listTripComponent = new ListTripView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    render(this.listSortComponent, tripEventsElement);
    for (let i = 0; i < 5; i++) {
      render(new ItemSortView, this.listSortComponent.getElement());
    }
    render(this.listTripComponent, tripEventsElement);
    render(new AddNewPointView, this.listTripComponent.getElement());
    render(new EditPointView, this.listTripComponent.getElement());
    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new ItemTripView({point: this.boardPoints[i]}), this.listTripComponent.getElement());
    }
  }
}
