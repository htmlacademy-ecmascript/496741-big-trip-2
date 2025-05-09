import { WAYPOINTS } from '../const';

export default function createNewPoint(selectedDestinationId) {
  return {
    basePrice: 0,
    dateFrom: '1970-01-01T00:00:00.000Z',
    dateTo: '1970-01-01T00:00:00.000Z',
    destination: selectedDestinationId,
    isFavorite: false,
    offers: [],
    type: WAYPOINTS[0]
  };
}
