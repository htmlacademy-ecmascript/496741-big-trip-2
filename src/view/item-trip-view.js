import { findTimeInterval, humanizeDate } from '../utils.js';
import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createItemTripTemplate(point, destinations) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    type,
  } = point;

  const {name} = destinations.find((itemDestination) => itemDestination.id === destination);

  const dateFromTime = humanizeDate(dateFrom, DateFormat.TIME);
  const dateFromDate = humanizeDate(dateFrom, DateFormat.DATE);
  const dateaToTime = humanizeDate(dateTo, DateFormat.TIME);

  const diffTime = findTimeInterval(dateFrom, dateTo);


  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateFromDate}</time>
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
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${basePrice}</span>
        </li>
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

export default class ItemTripView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;

  constructor({point, destinations, offers}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createItemTripTemplate(this.#point, this.#destinations, this.#offers);
  }
}
