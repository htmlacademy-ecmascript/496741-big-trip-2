import { FilterType } from '../const.js';
import { isFutureDate, isPastDate } from './trip';

const filter = {
  [FilterType.EVERYTHING.name]: (points) => points,
  [FilterType.FUTURE.name]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FilterType.PRESENT.name]: (points) => points.filter((point) => !isFutureDate(point.dateFrom) && isPastDate(point.dateTo)),
  [FilterType.PAST.name]: (points) => points.filter((point) => isPastDate(point.dateTo))
};

export { filter };
