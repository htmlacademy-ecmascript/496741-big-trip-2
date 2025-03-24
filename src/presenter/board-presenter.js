import { render } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ItemTripView from '../view/item-trip-view.js';
import EditPointView from '../view/edit-point-view.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

export default class BoardPresenter {
  listTripComponent = new ListTripView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new ListSortView, tripEventsElement);
    render(this.listTripComponent, tripEventsElement);
    render(new EditPointView({
      point: this.boardPoints[0],
      destinations: this.destinations,
      offers: this.offers
    }), this.listTripComponent.getElement());
    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new ItemTripView({
        point: this.boardPoints[i],
        destinations: this.destinations,
        offers: this.offers
      }), this.listTripComponent.getElement());
    }
  }
}
