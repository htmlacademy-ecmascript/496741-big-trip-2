import { render } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ButtonFilterView from '../view/button-filter-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortDateUp, sortDescendingCost, sortDurationDown } from '../utils/trip.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #sortListComponent = null;
  #listFilterComponent = null;
  #listTripComponent = new ListTripView();
  #tripСontrolsFiltersElement = document.querySelector('.trip-controls__filters');

  #boardPoints = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({boardContainer, pointsModel, filters}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#listFilterComponent = new ListFilterView({filters});
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderFilter();
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  };

  #renderFilter() {
    render(this.#listFilterComponent, this.#tripСontrolsFiltersElement);
    render(new ButtonFilterView, this.#listFilterComponent.element);
  }

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortDateUp);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortDescendingCost);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortDurationDown);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearTripList();
    this.#renderTripList();
  };

  #renderSort() {
    this.#sortListComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortListComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listTripComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, this.#destinations, this.#offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearTripList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderTripList() {
    render(this.#listTripComponent, this.#boardContainer);
    this.#boardPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      render(new ListEmptyView, this.#boardContainer);
      return;
    }

    this.#sortPoints(this.#currentSortType);
    this.#renderSort();
    this.#renderTripList();
  }
}
