import dayjs from 'dayjs';

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const findTimeInterval = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);

  const diffHours = date2.diff(date1, 'hour'); // Разница в часах
  const diffMinutes = date2.diff(date1, 'minute') % 60; // Оставшиеся минуты

  return diffHours ? `${diffHours}H ${diffMinutes}M` : `${diffMinutes}M`;
};

export { humanizeDate, findTimeInterval };
