import { WAYPOINTS } from '../const';
import { getRandomArrayElement } from '../utils';

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
      'b4c3e4e6-9053-42ce-b747-e281314baa32',
      'b4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: getRandomArrayElement(WAYPOINTS).toLowerCase()
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2802c',
    basePrice: 2000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e02',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa32'
    ],
    type: getRandomArrayElement(WAYPOINTS).toLowerCase()
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2803c',
    basePrice: 1000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: getRandomArrayElement(WAYPOINTS).toLowerCase()
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2803c',
    basePrice: 1500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [],
    type: getRandomArrayElement(WAYPOINTS).toLowerCase()
  }
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

const mockOffers = [
  {
    type: WAYPOINTS[0].toLowerCase(),
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: WAYPOINTS[1].toLowerCase(),
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa32',
        title: 'Upgrade to a business class',
        price: 140
      }
    ]
  },
  {
    type: WAYPOINTS[2].toLowerCase(),
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        title: 'Upgrade to a business class',
        price: 160
      }
    ]
  },
  {
    type: WAYPOINTS[3].toLowerCase(),
    offers: []
  }
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint, mockDestinations, mockOffers };
