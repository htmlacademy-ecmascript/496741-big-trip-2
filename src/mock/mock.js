import { WAYPOINTS } from '../const.js';

const createIdGenerator = () => {
  let currentId = 0;

  return function() {
    return currentId++;
  };
};

const getOfferId = createIdGenerator();

const getRandomInt = (min = 10, max = 2500) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomUniqueElementsId = (sourceArray) => {

  const count = getRandomInt(0, sourceArray.length);

  const shuffled = [...sourceArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count).map((element) => element.id);
};

const getOfferItem = () => ({
  id: getOfferId().toString(),
  title: 'Upgrade to a business class',
  price: getRandomInt()
});

const getOffer = (point) => ({
  type: point,
  offers: Array.from({length: getRandomInt(0, 6)}, getOfferItem)
});

const mockDestinations = [
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      },
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

const mockOffers = WAYPOINTS.map((point) => getOffer(point));

const getRandomOffersArrayByType = (type) => {

  const offersArray = mockOffers.find((offer) => offer.type === type).offers;

  return getRandomUniqueElementsId(offersArray);
};

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2801c',
    basePrice: 500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e01',
    isFavorite: false,
    offers: getRandomOffersArrayByType(WAYPOINTS[0]),
    type: WAYPOINTS[0]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2802c',
    basePrice: 2000,
    dateFrom: '2019-03-10T02:55:56.845Z',
    dateTo: '2019-03-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e02',
    isFavorite: false,
    offers: getRandomOffersArrayByType(WAYPOINTS[1]),
    type: WAYPOINTS[1]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2803c',
    basePrice: 1000,
    dateFrom: '2022-07-01T22:55:56.845Z',
    dateTo: '2022-07-05T11:20:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e03',
    isFavorite: true,
    offers: getRandomOffersArrayByType(WAYPOINTS[2]),
    type: WAYPOINTS[2]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2804c',
    basePrice: 1500,
    dateFrom: '2019-05-10T22:05:56.845Z',
    dateTo: '2019-05-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: true,
    offers: getRandomOffersArrayByType(WAYPOINTS[5]),
    type: WAYPOINTS[5]
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2805c',
    basePrice: 1500,
    dateFrom: '2018-05-10T22:05:56.845Z',
    dateTo: '2018-05-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: true,
    offers: getRandomOffersArrayByType(WAYPOINTS[5]),
    type: WAYPOINTS[5]
  },
];

export { mockDestinations, mockOffers, mockPoints };
