
import ferryImage from '../ferry.jpg'
import carparkImage from '../carpark.jpg'
import passport from '../passport-2.jpg'

const travelData = [
  {
    id: 1,
    image: passport,
    cancellation: 'Free cancellation within 14 days',
    rating: 4.7,
    reviews: 638,
    service: 'Single Trip Insurance',
    category: 'Travel Insurance',
    description: 'Comprehensive cover for single trips up to 31 days',
    price: 24.99,
    brand: 'TravelSure',
    convenience: 9
  },
  {
    id: 2,
    image: ferryImage,
    cancellation: 'Free cancellation after 48hrs',
    rating: 4.3,
    reviews: 412,
    service: 'Priority Pass Lounge',
    category: 'Airport Lounge',
    description: 'Access to partner lounges worldwide',
    price: 28.50,
    brand: 'Priority Pass',
    convenience: 7
  },
  {
    id: 3,
    image: carparkImage,
    cancellation: 'Free cancellation up to 48hrs',
    rating: 4.2,
    reviews: 256,
    service: 'Economy parking',
    category: 'Airport Parking',
    description: 'Budget friendly parking with regular shuttle service',
    price: 32.50,
    brand: 'Air Park',
    convenience: 6
  },
  {
    id: 4,
    image: ferryImage,
    cancellation: 'Free cancellation after 48hrs',
    rating: 4.6,
    reviews: 289,
    service: 'Executive Lounge Access',
    category: 'Airport Lounge',
    description: 'Premium lounge with complimentary food and drinks',
    price: 34.99,
    brand: 'SkyLounge',
    convenience: 8
  },
  {
    id: 5,
    image: ferryImage,
    cancellation: 'Free cancellation up to 24hrs',
    rating: 4.7,
    reviews: 178,
    service: 'Business Lounge',
    category: 'Airport Lounge',
    description: 'Professional environment with business facilities',
    price: 42.00,
    brand: 'Executive Travel',
    convenience: 9
  },
  {
    id: 6,
    image: passport,
    cancellation: 'Free cancellation within 14 days',
    rating: 4.9,
    reviews: 445,
    service: 'Premium Insurance Plus',
    category: 'Travel Insurance',
    description: 'Enhanced coverage with no excess and additional benefits',
    price: 42.50,
    brand: 'SecureTrip',
    convenience: 10
  },
  {
    id: 7,
    image: carparkImage,
    cancellation: 'Free cancellation after 48hrs',
    rating: 4.5,
    reviews: 342,
    service: 'Long Stay Parking',
    category: 'Airport Parking',
    description: 'Secure outdoor parking with shuttle service to terminal',
    price: 45.99,
    brand: 'ParkFly',
    convenience: 7
  },
  {
    id: 8,
    image: carparkImage,
    cancellation: 'Free cancellation up to 24hrs',
    rating: 4.4,
    reviews: 301,
    service: 'Short Stay Parking',
    category: 'Airport Parking',
    description: 'Close to terminal with covered parking',
    price: 55.00,
    brand: 'QuickPark',
    convenience: 8
  },
  {
    id: 9,
    image: carparkImage,
    cancellation: 'Free cancellation up to 48hrs',
    rating: 4.8,
    reviews: 521,
    service: 'Meet & Greet Parking',
    category: 'Airport Parking',
    description: 'Premium service - we park your car while you check in',
    price: 89.99,
    brand: 'ParkFly',
    convenience: 10
  },
  {
    id: 10,
    image: passport,
    cancellation: 'Free cancellation within 14 days',
    rating: 4.8,
    reviews: 892,
    service: 'Annual Multi-Trip Insurance',
    category: 'Travel Insurance',
    description: 'Unlimited trips throughout the year',
    price: 89.99,
    brand: 'TravelSure',
    convenience: 9
  }
]

export default travelData
