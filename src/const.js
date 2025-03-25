const POINTS_COUNT = 5;
const WAYPOINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const SORTING_ELEMENTS = ['day', 'event', 'time', 'price', 'offers'];
const FILTERS = ['everything', 'future', 'present', 'past'];


const ErrorText = {
  NO_WAYPOINTS: 'Click New Event to create your first point',
  NO_SERVER: 'Failed to load latest route information',
};

const KeyCode = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab'
};

const DateFormat = {
  DATE_AND_TIME: 'DD/MM/YY HH:mm',
  DATE: 'MMM DD',
  TIME: 'HH:mm'
};

export { POINTS_COUNT, WAYPOINTS, FILTERS, SORTING_ELEMENTS, ErrorText, DateFormat, KeyCode };
