import { POINTS_COUNT } from '../const';
import { getRandomPoint, mockDestinations, mockOffers } from '../mock/mock';

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
