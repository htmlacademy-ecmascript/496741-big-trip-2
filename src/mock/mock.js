import { WAYPOINTS } from '../const.js';

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2801c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: WAYPOINTS[0]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2802c',
    basePrice: 2000,
    dateFrom: '2019-03-10T02:55:56.845Z',
    dateTo: '2019-03-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e02',
    isFavorite: false,
    offers: [],
    type: WAYPOINTS[1]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2803c',
    basePrice: 1000,
    dateFrom: '2022-07-01T22:55:56.845Z',
    dateTo: '2022-07-05T11:20:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa34',
      'b4c3e4e6-9053-42ce-b747-e281314baa35',
      'b4c3e4e6-9053-42ce-b747-e281314baa36',
      'b4c3e4e6-9053-42ce-b747-e281314baa37'
    ],
    type: WAYPOINTS[2]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2804c',
    basePrice: 1500,
    dateFrom: '2019-05-10T22:05:56.845Z',
    dateTo: '2019-05-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: true,
    offers: [],
    type: WAYPOINTS[5]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2805c',
    basePrice: 1500,
    dateFrom: '2018-05-10T22:05:56.845Z',
    dateTo: '2018-05-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa38',
      'b4c3e4e6-9053-42ce-b747-e281314baa41',
      'b4c3e4e6-9053-42ce-b747-e281314baa42'
    ],
    type: WAYPOINTS[5]
  },
];

const mockDestinations = [
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e02',
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Amsterdam parliament building'
      }
    ]
  },
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    description: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Geneva parliament building'
      }
    ]
  },
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    description: 'Tokyo, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tokyo',
    pictures: []
  }
];

function createIdGenerator() {
  let currentId = 0;

  return function() {
    return currentId++;
  };
}

function getRandomInt(min = 10, max = 2500) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getOfferId = createIdGenerator();

const getOfferItem = () => ({
  id: getOfferId().toString(),
  title: 'Upgrade to a business class',
  price: getRandomInt()
});

const getOffer = (point) => ({
  type: point,
  offers: Array.from({length: getRandomInt(0, 6)}, getOfferItem)
});

const mockOffers = WAYPOINTS.map((point) => getOffer(point));

export { mockDestinations, mockOffers, mockPoints };
