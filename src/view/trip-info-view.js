import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils/trip.js';

function createTripInfoTemplate(points, destinations) {
  let totalPrice = 0;
  points.forEach((point) => {
    totalPrice += point.basePrice;
  });

  const firstDestination = points.length > 0 ? destinations.find(
    (itemDestination) => itemDestination.id === points[0].destination
  ) : null;
  const secondDestination = points.length === 3 ? destinations.find(
    (itemDestination) => itemDestination.id === points[1].destination
  ) : null;
  const lastDestination = points.length > 1 ? destinations.find(
    (itemDestination) => itemDestination.id === points[points.length - 1].destination
  ) : null;

  const dateFrom = points.length > 0
    ? humanizeDate(points[0].dateFrom, DateFormat.DAY_MONTH)
    : '';
  const dateTo = points.length > 1
    ? ` &nbsp;&mdash;&nbsp; ${humanizeDate(points[points.length - 1].dateTo, DateFormat.DAY_MONTH)}`
    : '';
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">
                ${firstDestination ? firstDestination.name : ''}
                ${secondDestination ? ` &mdash; ${secondDestination.name}` : ''}
                ${points.length > 3 ? ' &mdash; ...' : ''}
                ${lastDestination ? ` &mdash; ${lastDestination.name}` : ''}
              </h1>
              <p class="trip-info__dates">${dateFrom}${dateTo}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinations = [];

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
