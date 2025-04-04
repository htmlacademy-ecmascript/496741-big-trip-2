import { KeyCode } from '../const';
import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import ItemTripView from '../view/item-trip-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #itemTripComponent = null;
  #editPointComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;


  constructor({pointListContainer}) {
    this.#pointListContainer = pointListContainer;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#itemTripComponent = new ItemTripView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEventRollupButtonClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEventRollupButtonClick: this.#replaceFormToCardHandler,
      onFormSubmit: this.#replaceFormToCardHandler
    });

    render(this.#itemTripComponent, this.#pointListContainer);
  }

  #replaceCardToForm() {
    replace(this.#editPointComponent, this.#itemTripComponent);
  }

  #replaceFormToCard() {
    replace(this.#itemTripComponent, this.#editPointComponent);
  }

  #replaceFormToCardHandler() {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE) {
      evt.preventDefault();
      this.#replaceFormToCardHandler();
    }
  };
}
