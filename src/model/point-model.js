import { WaypointType } from '../const';

export default function createNewPoint() {
  return {
    basePrice: 0,
    dateFrom: '1970-01-01T00:00:00.000Z',
    dateTo: '1970-01-01T00:00:00.000Z',
    destination: null,
    isFavorite: false,
    offers: [],
    type: WaypointType.FLIGHT,
  };
}
