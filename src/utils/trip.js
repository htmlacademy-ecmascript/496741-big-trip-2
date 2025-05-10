import dayjs from 'dayjs';

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const findTimeInterval = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  let diff = '';

  const diffDays = date2.diff(date1, 'day');//в днях
  const diffHours = date2.diff(date1, 'hour'); // Разница в часах
  const diffMinutes = date2.diff(date1, 'minute') % 60; // Оставшиеся минуты

  if (diffDays) {
    diff = `${diffDays}D ${diffHours}H ${diffMinutes}M`;
  } else if (diffHours) {
    diff = `${diffHours}H ${diffMinutes}M`;
  } else {
    diff = `${diffMinutes}M`;
  }

  return diff;
};

function isFutureDate(targetDate) {
  return dayjs().isBefore(dayjs(targetDate));
}

function isPastDate(targetDate) {
  return dayjs().isAfter(dayjs(targetDate));
}

const sortDescendingCost = (a, b) => b.basePrice - a.basePrice;

const sortDateUp = (a, b) => dayjs(a.dateFrom).valueOf() - dayjs(b.dateFrom).valueOf();

const sortDurationDown = (a, b) => {
  const durationA = dayjs(a.dateTo).diff(dayjs(a.dateFrom), 'day');
  const durationB = dayjs(b.dateTo).diff(dayjs(b.dateFrom), 'day');
  return durationB - durationA;
};

function isSecondDateAfter(firstDate, secondDate) {
  return dayjs(secondDate).isAfter(dayjs(firstDate));
}

export {
  humanizeDate,
  findTimeInterval,
  isFutureDate,
  isPastDate,
  sortDescendingCost,
  sortDateUp,
  sortDurationDown,
  isSecondDateAfter,
};
