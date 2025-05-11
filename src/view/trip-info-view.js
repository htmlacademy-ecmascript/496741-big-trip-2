import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, sortDateUp } from '../utils/trip.js';

function createTripInfoTemplate(points, destinations, offers) {
  let totalPrice = 0;
  points.forEach((point) => {
    totalPrice += point.basePrice;
    const offersForType = offers.find((offer) => offer.type === point.type);
    point.offers.forEach((selectedOfferId) => {
      const foundOffer = offersForType.offers.find((offer) => offer.id === selectedOfferId);
      if (foundOffer) {
        totalPrice += foundOffer.price;
      }
    });
  });

  const sortedPoints = [...points].sort(sortDateUp);

  const firstDestination = sortedPoints.length > 0 ? destinations.find(
    (itemDestination) => itemDestination.id === sortedPoints[0].destination
  ) : null;
  const secondDestination = sortedPoints.length === 3 ? destinations.find(
    (itemDestination) => itemDestination.id === sortedPoints[1].destination
  ) : null;
  const lastDestination = sortedPoints.length > 1 ? destinations.find(
    (itemDestination) => itemDestination.id === sortedPoints[sortedPoints.length - 1].destination
  ) : null;

  function getDateTo() {
    let date = '';
    if (sortedPoints.length === 1) {
      date = humanizeDate(sortedPoints[0].dateTo, DateFormat.DAY_MONTH);
    } else if (sortedPoints.length > 1) {
      date = humanizeDate(sortedPoints[sortedPoints.length - 1].dateTo, DateFormat.DAY_MONTH);
    } else {
      return date;
    }

    return ` &nbsp;&mdash;&nbsp; ${date}`;
  }

  const dateFrom = sortedPoints.length > 0
    ? humanizeDate(sortedPoints[0].dateFrom, DateFormat.DAY_MONTH)
    : '';
  const dateTo = getDateTo();
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">
                ${firstDestination ? firstDestination.name : ''}
                ${secondDestination ? ` &mdash; ${secondDestination.name}` : ''}
                ${sortedPoints.length > 3 ? ' &mdash; ...' : ''}
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
  #offers = [];

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
