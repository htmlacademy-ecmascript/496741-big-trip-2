import { findTimeInterval, humanizeDate } from '../utils/trip.js';
import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createOffersTemplate(offers) {
  return offers.map((offer) => {
    const { title, price } = offer;
    return `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`;
  }).join('');
}

function createPointTemplate(point, destinations, offers) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers: selectedOffers,
    type,
  } = point;

  const offer = offers.find((foundOffer) => foundOffer.type === type);

  const pointOffers = offer.offers.filter((foundOffer) => selectedOffers.includes(foundOffer.id));
  const offersTemplate = createOffersTemplate(pointOffers);
  const {name} = destinations.find(
    (itemDestination) => itemDestination.id === destination
  );

  const dateFromDate = humanizeDate(dateFrom, DateFormat.DATE);
  const dateFromTime = humanizeDate(dateFrom, DateFormat.TIME);
  const dateFromMonthAndDay = humanizeDate(dateFrom, DateFormat.MONTH_AND_DAY);
  const dateaToTime = humanizeDate(dateTo, DateFormat.TIME);

  const diffTime = findTimeInterval(dateFrom, dateTo);


  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFromDate}">${dateFromMonthAndDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${dateFromTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${dateaToTime}</time>
        </p>
        <p class="event__duration">${diffTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleFavoriteClick = null;
  #handleRollupButtonClick = null;
  #favouriteButtonElement = null;
  #rollupButtonElement = null;

  constructor({point, destinations, offers, onFavoriteClick, onRollupButtonClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#rollupButtonElement = this.element.querySelector('.event__rollup-btn');
    this.#favouriteButtonElement = this.element.querySelector('.event__favorite-btn');

    this.#favouriteButtonElement.addEventListener('click', this.#favoriteButtonClickHandler);
    this.#rollupButtonElement.addEventListener('click', this.#rollupButtonClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };
}
