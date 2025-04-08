import { KeyCode } from '../const';
import { remove, render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;


  constructor({pointListContainer, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFavoriteClick: this.#handleFavoriteClick,
      onRollupButtonClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onRollupButtonClick: this.#replaceFormToCardHandler,
      onFormSubmit: this.#handleFormSubmit
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#pointListContainer.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #replaceCardToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#editPointComponent);
  }

  #replaceFormToCardHandler = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      this.#replaceFormToCardHandler();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToCardHandler();
  };
}
