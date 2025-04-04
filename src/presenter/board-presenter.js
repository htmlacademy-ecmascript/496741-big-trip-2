import { render } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ButtonFilterView from '../view/button-filter-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #listFilterComponent = null;
  #listTripComponent = new ListTripView();
  #tripСontrolsFiltersElement = document.querySelector('.trip-controls__filters');

  #boardPoints = [];
  #destinations = [];
  #offers = [];

  constructor({boardContainer, pointsModel, filters}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#listFilterComponent = new ListFilterView({filters});
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderFilter();
    this.#renderBoard();
  }

  #renderFilter() {
    render(this.#listFilterComponent, this.#tripСontrolsFiltersElement);
    render(new ButtonFilterView, this.#listFilterComponent.element);
  }

  #renderSort() {
    render(new ListSortView, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listTripComponent.element,
    });

    pointPresenter.init(point, this.#destinations, this.#offers);
  }

  #renderTripList() {
    render(this.#listTripComponent, this.#boardContainer);
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      render(new ListEmptyView, this.#boardContainer);
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  }
}
