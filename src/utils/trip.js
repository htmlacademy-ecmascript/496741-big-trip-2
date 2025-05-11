import dayjs from 'dayjs';

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const findTimeInterval = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  let diff = '';

  const totalMinutes = date2.diff(date1, 'minute');
  const diffDays = Math.floor(totalMinutes / (60 * 24));
  const diffHours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const diffMinutes = totalMinutes % 60;

  const daysStr = String(diffDays).padStart(2, '0');
  const hoursStr = String(diffHours).padStart(2, '0');
  const minutesStr = String(diffMinutes).padStart(2, '0');

  if (diffDays) {
    diff = `${daysStr}D ${hoursStr}H ${minutesStr}M`;
  } else if (diffHours) {
    diff = `${hoursStr}H ${minutesStr}M`;
  } else {
    diff = `${minutesStr}M`;
  }

  return diff;
};

function isFutureDate(targetDate) {
  return dayjs().isBefore(dayjs(targetDate));
}

function isPastDate(targetDate) {
  return dayjs().isAfter(dayjs(targetDate));
}

const sortDescendingCost = (firstPoint, secondPoint) =>
  secondPoint.basePrice - firstPoint.basePrice;

const sortDateUp = (firstPoint, secondPoint) =>
  dayjs(firstPoint.dateFrom).valueOf() - dayjs(secondPoint.dateFrom).valueOf();

const sortDurationDown = (firstPoint, secondPoint) => {
  const durationA = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom), 'day');
  const durationB = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom), 'day');
  return durationB - durationA;
};

function isSecondDateAfter(firstDate, secondDate) {
  return dayjs(secondDate).isAfter(dayjs(firstDate));
}

function getRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
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
  getRandomString,
};
