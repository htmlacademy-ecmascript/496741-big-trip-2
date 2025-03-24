import { render } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ItemTripView from '../view/item-trip-view.js';
import EditPointView from '../view/edit-point-view.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #listTripComponent = new ListTripView();

  #boardPoints = [];
  #boardDestinations = [];
  #boardOffers = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardDestinations = [...this.#pointsModel.destinations];
    this.#boardOffers = [...this.#pointsModel.offers];

    render(new ListSortView, tripEventsElement);
    render(this.#listTripComponent, tripEventsElement);
    render(new EditPointView({
      point: this.#boardPoints[0],
      destinations: this.#boardDestinations,
      offers: this.#boardOffers
    }), this.#listTripComponent.element);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      render(new ItemTripView({
        point: this.#boardPoints[i],
        destinations: this.#boardDestinations,
        offers: this.#boardOffers
      }), this.#listTripComponent.element);
    }
  }
}
