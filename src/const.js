const POINTS_COUNT = 5;
const WAYPOINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const ErrorText = {
  NO_WAYPOINTS: 'Click New Event to create your first point',
  NO_SERVER: 'Failed to load latest route information',
};

const KeyCode = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const DateFormat = {
  DATE_AND_TIME: 'DD/MM/YY HH:mm',
  DATE: 'YYYY-MM-DD',
  MONTH_AND_DAY: 'MMM DD',
  TIME: 'HH:mm'
};


const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  POINTS_COUNT,
  WAYPOINTS,
  FilterType,
  NoPointsTextType,
  ErrorText,
  DateFormat,
  KeyCode,
  Mode,
  SortType,
  UserAction,
  UpdateType
};
