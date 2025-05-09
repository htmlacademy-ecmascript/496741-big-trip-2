import { DateFormat, WaypointType } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate } from '../utils/trip.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createOffersTemplate(availableOffers, selectedOffers) {
  return availableOffers.map((offer) => {
    const { id, title, price } = offer;

    return `<div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${id}"
      type="checkbox"
      name="event-offer"
      data-offer-id=${id}
      ${selectedOffers.includes(id) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
  }).join('');
}

function createEventTypeItemsTemplate(selectedType) {
  return Object.values(WaypointType).map((type) => `<div class="event__type-item">
    <input
      id="event-type-${type}-1"
      class="event__type-input  visually-hidden"
      type="radio" name="event-type"
      value="${type}"
      ${type === selectedType ? 'checked' : ''}
    >
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`).join('');
}

function createDestinationOptionsTemplate(destinations) {
  return destinations.map((destination) => `<option value=${destination.name}></option>`).join('');
}

function createPicturesTemplate(pictures) {
  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
            </div>
          </div>`;
}

function createEditPointTemplate(point, destinations, offers) {

  const {
    id,
    basePrice,
    dateFrom,
    dateTo,
    destination,
    type,
    offers: selectedOffers,
    isDisabled,
    isSaving,
    isDeleting
  } = point;

  const {description, name, pictures} = destinations.find((itemDestination) => itemDestination.id === destination);

  const offer = offers.find((faundOffer) => faundOffer.type === type);

  const dateFromDataAndTime = humanizeDate(dateFrom, DateFormat.DATE_AND_TIME);
  const dateaToDateAndTime = humanizeDate(dateTo, DateFormat.DATE_AND_TIME);

  const offersTemplate = createOffersTemplate(offer.offers, selectedOffers);
  const eventTypeItemsTemplate = createEventTypeItemsTemplate(type);
  const destinationOptionsTemplate = createDestinationOptionsTemplate(destinations);
  const picturesTemplate = pictures.length !== 0 ? createPicturesTemplate(pictures) : '';

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeItemsTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-${id}"
            type="text"
            name="event-destination"
            value="${name}"
            list="destination-list-${id}"
          >
          <datalist id="destination-list-${id}">
            ${destinationOptionsTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value=${dateFromDataAndTime}
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value=${dateaToDateAndTime}
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            name="event-price"
            value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
          ${ isSaving ? 'Saving' : 'Save'}
        </button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
          ${ isDeleting ? 'Deleting' : 'Delete'}
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          ${picturesTemplate}
        </section>
      </section>
    </form>
  </li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #destinations;
  #offers;
  #handleRollupButtonClick = null;
  #handleFormSubmit = null;
  #handieDeleteClick = null;
  #saveButtonElement = null;
  #deleteButtonElement = null;
  #rollupButtonElement = null;
  #typeInputElements = null;
  #offerInputElements = null;
  #destinationInputElement = null;
  #priceInputElement = null;
  #datepickrFrom = null;
  #datepickrTo = null;

  constructor({point, destinations, offers, onRollupButtonClick, onFormSubmit, onDeleteClick}) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handieDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if(this.#datepickrFrom) {
      this.#datepickrFrom.destroy();
      this.#datepickrFrom = null;
    }

    if(this.#datepickrTo) {
      this.#datepickrTo.destroy();
      this.#datepickrTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    this.#saveButtonElement = this.element.querySelector('.event__save-btn');
    this.#deleteButtonElement = this.element.querySelector('.event__reset-btn');
    this.#typeInputElements = this.element.querySelector('.event__type-group');
    this.#offerInputElements = this.element.querySelector('.event__available-offers');
    this.#destinationInputElement = this.element.querySelector('.event__input--destination');
    this.#priceInputElement = this.element.querySelector('.event__input--price');

    this.#rollupButtonElement.addEventListener('click', this.#clickRollupButtonHandler);
    this.#saveButtonElement.addEventListener('click', this.#formSubmitHandler);
    this.#deleteButtonElement.addEventListener('click', this.#formDeleteHandler);
    this.#typeInputElements.addEventListener('change', this.#typeInputHandler);
    this.#offerInputElements.addEventListener('change', this.#offersChangeHandler);
    this.#destinationInputElement.addEventListener('input', this.#destinationInputHandler);
    this.#priceInputElement.addEventListener('input', this.#priceInputHandler);

    this.#setDatepickrs();
  }

  #typeInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #offersChangeHandler = (evt) => {
    if (!this._state.offers.includes(evt.target.dataset.offerId)) {
      this._setState({
        offers: [...this._state.offers, evt.target.dataset.offerId]
      });
    } else {
      const filteredOffers = [...this._state.offers.filter((offer) => offer !== evt.target.dataset.offerId)];
      this._setState({
        offers: filteredOffers
      });
    }
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    if (!this.#destinations.some((destination) => destination.name === evt.target.value)) {
      return;
    }
    const newDestination = this.#destinations.find(
      (destination) => destination.name === evt.target.value
    );
    this.updateElement({
      destination: newDestination.id,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: parseInt(evt.target.value, 10),
    });
  };

  #dateFromCloseHandler = ([date]) => {
    this.updateElement({
      dateFrom: date,
    });
  };

  #dateToCloseHandler = ([date]) => {
    this.updateElement({
      dateTo: date,
    });
  };

  #clickRollupButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handieDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #setDatepickrs() {
    const dateFromElement = this.element.querySelector('#event-start-time-1');
    const dateToElement = this.element.querySelector('#event-end-time-1');

    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickrFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickrTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom
      }
    );
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
