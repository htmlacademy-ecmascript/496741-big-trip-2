import { KeyCode, UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { isSecondDateAfter } from '../utils/trip.js';
import AddNewPointView from '../view/add-new-point-view.js';

export default class NewPointPresenter {
  #destinations = null;
  #offers = null;
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #addNewPointComponent = null;

  constructor({destinations, offers, pointListContainer, onDataChange, onDestroy}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addNewPointComponent !== null) {
      return;
    }

    this.#addNewPointComponent = new AddNewPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#addNewPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addNewPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addNewPointComponent);
    this.#addNewPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#addNewPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addNewPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#addNewPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    if (!this.#validatePoint(point)) {
      this.setAborting();
      return;
    }

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #validatePoint = (point) => {
    if (point.basePrice <= 0 || point.basePrice > 10000) {
      return false;
    }
    if (!isSecondDateAfter(point.dateFrom, point.dateTo)) {
      return false;
    }
    if (!point.destination) {
      return false;
    }
    return true;
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
