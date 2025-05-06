import { FilterType } from '../const.js';
import { isFutureDate, isPastDate } from './trip';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => !isFutureDate(point.dateFrom) && isPastDate(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo))
};

export { filter };
