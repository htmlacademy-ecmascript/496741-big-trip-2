import { WaypointType } from '../const';

export default function createNewPoint() {
  return {
    basePrice: 0,
    dateFrom: '',
    dateTo: '',
    destination: null,
    isFavorite: false,
    offers: [],
    type: WaypointType.FLIGHT,
  };
}
