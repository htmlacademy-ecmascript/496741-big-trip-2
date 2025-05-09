import { KeyCode, UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );

    this.destroy();
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
