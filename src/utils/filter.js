import { FilterType } from '../const.js';
import { isFutureDate, isPastDate } from './trip';

// Everything — полный список точек маршрута;
// Future — список запланированных точек маршрута, т. е. точек,
// у которых дата начала события больше текущей даты;
// Present — список текущих точек маршрута, т. е. точек,
// у которых дата начала события меньше (или равна) текущей даты,
// а дата окончания больше (или равна) текущей даты;
// Past — список пройденных точек маршрута,
// т. е. точек у которых дата окончания маршрута меньше, чем текущая.

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter(
    (point) => !isFutureDate(point.dateFrom) && !isPastDate(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo))
};

export { filter };
