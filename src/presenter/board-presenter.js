import { remove, render, RenderPosition } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { FilterType, SortType, TimeLimit, UpdateType, UserAction } from '../const.js';
import { sortDateUp, sortDescendingCost, sortDurationDown } from '../utils/trip.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
import FailedLoadView from '../view/failed-load-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #handleNewPointDestroy = null;
  #sortListComponent = null;
  #listEmptyComponent = null;
  #tripInfoComponent = null;
  #pointListComponent = new ListTripView();
  #loadingComponent = new LoadingView();
  #failedLoadComponent = new FailedLoadView();

  #siteHeaderElement = document.querySelector('.trip-main');
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isServerFailed = false;
  #uiBlocker = new UiBlocker ({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({boardContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#handleNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDateUp);
      case SortType.PRICE:
        return filteredPoints.sort(sortDescendingCost);
      case SortType.TIME:
        return filteredPoints.sort(sortDurationDown);
    }
    return filteredPoints;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter = new NewPointPresenter({
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers,
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: () => {
        this.#newPointPresenter = null;
        this.#handleNewPointDestroy();
        if (this.points.length === 0) {
          this.#renderListEmpty();
        }
      }
    });
    this.#newPointPresenter.init();
    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }
  }

  #handleModeChange = () => {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        if (this.#newPointPresenter) {
          this.#newPointPresenter.setSaving();
        }
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.SERVER_ERROR:
        this.#isLoading = false;
        this.#isServerFailed = true;
        this.#renderBoard();
        break;
    }
  };

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

  #renderTripInfo() {
    this.#tripInfoComponent = new TripInfoView({
      points: this.#pointsModel.points,
      destinations: this.destinations,
      offers: this.offers,
    });
    render(this.#tripInfoComponent, this.#siteHeaderElement, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #renderFailedLoad() {
    render(this.#failedLoadComponent, this.#boardContainer);
  }

  #renderListEmpty() {
    this.#listEmptyComponent = new ListEmptyView({
      filterType: this.#filterType,
    });

    render(this.#listEmptyComponent, this.#boardContainer);
  }

  #clearBoard({resetSortType = false} = {}) {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortListComponent);
    remove(this.#loadingComponent);
    remove(this.#tripInfoComponent);
    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }
    if (this.#failedLoadComponent) {
      remove(this.#failedLoadComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    if (this.#isServerFailed) {
      remove(this.#loadingComponent);
      this.#renderFailedLoad();
      return;
    }

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSort();

    render(this.#pointListComponent, this.#boardContainer);
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });

    if (this.points.length === 0 && !this.#newPointPresenter) {
      this.#renderListEmpty();
    } else {
      this.#renderTripInfo();
    }
  }
}
