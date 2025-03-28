import { render, replace } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import ListTripView from '../view/list-trip-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ItemTripView from '../view/item-trip-view.js';
import EditPointView from '../view/edit-point-view.js';
import { KeyCode } from '../const.js';
import ListFilterView from '../view/list-filter-view.js';
import ButtonFilterView from '../view/button-filter-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #listFilterComponent = null;
  #listTripComponent = new ListTripView();
  #tripСontrolsFiltersElement = document.querySelector('.trip-controls__filters');

  #boardPoints = [];
  #boardDestinations = [];
  #boardOffers = [];

  constructor({boardContainer, pointsModel, filters}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#listFilterComponent = new ListFilterView({filters});
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardDestinations = [...this.#pointsModel.destinations];
    this.#boardOffers = [...this.#pointsModel.offers];

    render(this.#listFilterComponent, this.#tripСontrolsFiltersElement);
    render(new ButtonFilterView, this.#listFilterComponent.element);

    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === KeyCode.ESCAPE) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const itemTripComponent = new ItemTripView({
      point,
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
      onEventRollupButtonClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
      onEventRollupButtonClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(editPointComponent, itemTripComponent);
    }

    function replaceFormToCard() {
      replace(itemTripComponent, editPointComponent);
    }

    render(itemTripComponent, this.#listTripComponent.element);
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      render(new ListEmptyView, this.#boardContainer);
      return;
    }
    render(new ListSortView, this.#boardContainer);
    render(this.#listTripComponent, this.#boardContainer);

    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }
}
