import { remove, render } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ButtonFilterView from '../view/button-filter-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortDateUp, sortDescendingCost, sortDurationDown } from '../utils/trip.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #sortListComponent = null;
  #listEmptyComponent = new ListEmptyView();
  #listFilterComponent = null;
  #listTripComponent = new ListTripView();
  #tripСontrolsFiltersElement = document.querySelector('.trip-controls__filters');

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointsModel, filters}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#listFilterComponent = new ListFilterView({filters});
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch(this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortDateUp);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortDescendingCost);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortDurationDown);
    }
    return this.#pointsModel.points;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderFilter();
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderFilter() {
    render(this.#listFilterComponent, this.#tripСontrolsFiltersElement);
    render(new ButtonFilterView, this.#listFilterComponent.element);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortListComponent = new ListSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortListComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listTripComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortListComponent);
    remove(this.#listEmptyComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    if (this.points.length === 0) {
      render(this.#listEmptyComponent, this.#boardContainer);
      return;
    }

    this.#renderSort();

    render(this.#listTripComponent, this.#boardContainer);
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
