import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic vagiza_authorizati0n';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripСontrolsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripСontrolsFiltersElement,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}
render(newPointButtonComponent, siteHeaderElement);

filterPresenter.init();
boardPresenter.init();
