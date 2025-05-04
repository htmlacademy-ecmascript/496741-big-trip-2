import Observable from '../framework/observable';
import { mockDestinations, mockOffers } from '../mock/mock';
import { mockPoints } from '../mock/mock';

export default class PointsModel extends Observable {
  #points = mockPoints.sort(() => Math.random() - 0.5);
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
