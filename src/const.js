const POINTS_COUNT = 5;
const WAYPOINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const FILTERS = ['Everything', 'Future', 'Present', 'Past' ];
const SORTING_ELEMENTS = ['day', 'event', 'time', 'price', 'offers'];


const ErrorText = {
  NO_WAYPOINTS: 'Click New Event to create your first point',
  NO_SERVER: 'Failed to load latest route information',
};

const DateFormat = {
  DATE_AND_TIME: 'DD/MM/YY HH:mm',
  DATE: 'MMM DD',
  TIME: 'HH:mm'
};

export { POINTS_COUNT, WAYPOINTS, FILTERS, SORTING_ELEMENTS, ErrorText, DateFormat };
