import { DateFormat, WAYPOINTS } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate } from '../utils/trip.js';

function createOffersTemplate(availableOffers, selectedOffers) {
  return availableOffers.map((offer) => {
    const { id, title, price } = offer;

    return `<div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${id}"
      type="checkbox"
      name="event-offer"
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
  return WAYPOINTS.map((type) => `<div class="event__type-item">
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

function createEditPointTemplate(point, destinations, offers) {

  const {
    id,
    basePrice,
    dateFrom,
    dateTo,
    destination,
    type,
    offers: selectedOffers
  } = point;

  const {description, name} = destinations.find((itemDestination) => itemDestination.id === destination);


  const offer = offers.find((faundOffer) => faundOffer.type === type);

  const dateFromDataAndTime = humanizeDate(dateFrom, DateFormat.DATE_AND_TIME);
  const dateaToDateAndTime = humanizeDate(dateTo, DateFormat.DATE_AND_TIME);

  const offersTemplate = createOffersTemplate(offer.offers, selectedOffers);
  const eventTypeItemsTemplate = createEventTypeItemsTemplate(type);
  const destinationOptionsTemplate = createDestinationOptionsTemplate(destinations);

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
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${dateFromDataAndTime}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dateaToDateAndTime}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
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
  #saveButtonElement = null;
  #rollupButtonElement = null;
  #typeInputElements = null;
  #destinationInputElement = null;

  constructor({point, destinations, offers, onRollupButtonClick, onFormSubmit}) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations, this.#offers);
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    this.#saveButtonElement = this.element.querySelector('.event__save-btn');
    this.#typeInputElements = this.element.querySelector('.event__type-group');
    this.#destinationInputElement = this.element.querySelector('.event__input--destination');

    this.#rollupButtonElement.addEventListener('click', this.#clickRollupButtonHandler);
    this.#saveButtonElement.addEventListener('click', this.#formSubmitHandler);
    this.#typeInputElements.addEventListener('change', this.#typeInputHandler);
    this.#destinationInputElement.addEventListener('input', this.#destinationInputHandler);
  }

  #typeInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    if (!this.#destinations.some((destination) => destination.name === evt.target.value)) {
      return;
    }
    const newDestination = this.#destinations.find(
      (destination) => destination.name === evt.target.value
    );
    this._setState({
      destination: newDestination.id,
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

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
