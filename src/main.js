import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointsModel,
  filters
});

boardPresenter.init();
