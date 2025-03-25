import { render } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ItemTripView from '../view/item-trip-view.js';
import ListItemContainerView from '../view/list-item-container-view.js';
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

    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #handleEventRollupButtonClick = (point, container) => {
    render(new EditPointView({
      point,
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
    }), container);
  };

  #renderPoint(point) {

    const listItemContainerComponent = new ListItemContainerView();
    render(listItemContainerComponent, this.#listTripComponent.element);

    const itemTripComponent = new ItemTripView({
      point,
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
      onClick: () => this.#handleEventRollupButtonClick(point, listItemContainerComponent.element)
    });
    render(itemTripComponent, listItemContainerComponent.element);
  }
}
