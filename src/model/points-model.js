import { POINTS_COUNT } from '../const';
import { getRandomPoint, mockDestinations, mockOffers } from '../mock/mock';

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
