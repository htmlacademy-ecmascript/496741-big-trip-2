import { render } from './framework/render.js';
import ButtonFilterView from './view/button-filter-view.js';
import ListFilterView from './view/list-filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');
const tripСontrolsFiltersElement = pageHeaderElement.querySelector('.trip-controls__filters');

const listFilterComponent = new ListFilterView();

render(listFilterComponent, tripСontrolsFiltersElement);
render(new ButtonFilterView, listFilterComponent.element);

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: pageMainElement,
  pointsModel
});

boardPresenter.init();
