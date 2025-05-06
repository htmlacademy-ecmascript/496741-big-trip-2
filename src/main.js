import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';


const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripСontrolsFiltersElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointsModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripСontrolsFiltersElement,
  filterModel,
  pointsModel,
});

filterPresenter.init();
boardPresenter.init();
