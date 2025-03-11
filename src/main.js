import BoardPresenter from './presenter/board-presenter';
import { render } from './render';
import ButtonFilterView from './view/button-filter-view';
import ItemFilterView from './view/item-filter-view';
import ListFilterView from './view/list-filter-view';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');
const tripСontrolsFiltersElement = pageHeaderElement.querySelector('.trip-controls__filters');

const listFilterComponent = new ListFilterView();

render(listFilterComponent, tripСontrolsFiltersElement);
for (let i = 0; i < 4; i++) {
  render(new ItemFilterView, listFilterComponent.getElement());
}
render(new ButtonFilterView, listFilterComponent.getElement());

const boardPresenter = new BoardPresenter({boardContainer: pageMainElement});

boardPresenter.init();
