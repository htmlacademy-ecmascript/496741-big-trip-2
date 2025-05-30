const WaypointType = {
  TAXY: 'taxi',
  BUS: 'bus',
  TRAYN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};


const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Url = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

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
  NO_SERVER: 'Failed to load latest route information',
};

const KeyCode = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const DateFormat = {
  DATE_AND_TIME: 'DD/MM/YY HH:mm',
  DATE: 'YYYY-MM-DD',
  MONTH_DAY: 'MMM DD',
  DAY_MONTH: 'DD MMM',
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
  INIT: 'INIT',
  SERVER_ERROR: 'SERVER_ERROR',
};

export {
  Method,
  TimeLimit,
  Url,
  WaypointType,
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
