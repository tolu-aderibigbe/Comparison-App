import React, { useState } from 'react';
import "./header.css"
import "./App.css"

import ferryImage from "./ferry.jpg"
import carparkImage from "./carpark.jpg"
import passport from "./passport-2.jpg"

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
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [sortBy, setSortBy] = useState('Price: Low to high');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filteredAndSortedData = () => {
    let result = [...travelData];

    // Filter by type
    if (filterType !== 'All Types') {
      result = result.filter(item => item.category === filterType);
    }

    // Sort by selected criteria
    if (sortBy === 'Price: Low to high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Rating: High to low') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Rating: Low to high') {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  };

  const displayData = filteredAndSortedData();

  const typeOptions = ['All Types', 'Travel Insurance', 'Airport Lounge', 'Airport Parking'];
  const sortOptions = ['Price: Low to high', 'Price: High to low', 'Rating: High to low', 'Rating: Low to high'];

  return (
    <>
      <style>{`
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 4px;
          min-width: 200px;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        .dropdown-item {
          padding: 10px 15px;
          cursor: pointer;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 14px;
        }
        
        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
        
        .dropdown-item.selected {
          background-color: #f0f0f0;
        }
        
        .dropdown-wrapper {
          position: relative;
        }
      `}</style>

      <div className="header">
        <button className="logo">TX.</button>
        <button className="header-content">Airport extras</button>
        <button className="header-content">Travel Insurance</button>
        <button className="header-content">Other Extras</button>
        <div className="search">
          <span className="material-symbols-outlined">search</span>
          <input
            className="search-bar"
            placeholder="Search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="header-content">Log in</button>
        <button className="header-content">Sign Up</button>
        <button className="header-content2">Get Started</button>
        <button className="header-content3">Support</button>
      </div>

      <div className="sorting-bar">
        <div className="left-side-bar">
          <div className="type-class">
            <p className="by">Filter by type</p>
            <div className="dropdown-wrapper">
              <button 
                className="sorting-button"
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowSortDropdown(false);
                }}
              >
                {filterType}
              </button>
              {showTypeDropdown && (
                <div className="dropdown-menu">
                  {typeOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${filterType === option ? 'selected' : ''}`}
                      onClick={() => {
                        setFilterType(option);
                        setShowTypeDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="price-class">
            <p className="by">Sort by</p>
            <div className="dropdown-wrapper">
              <button 
                className="sorting-button"
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown);
                  setShowTypeDropdown(false);
                }}
              >
                {sortBy}
              </button>
              {showSortDropdown && (
                <div className="dropdown-menu">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${sortBy === option ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy(option);
                        setShowSortDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right-side-bar">
          <button
            className="reset-button"
            onClick={() => {
              setFilterType('All Types');
              setSortBy('Price: Low to high');
            }}
          >
            Reset Filter
          </button>
        </div>
      </div>

      <div className="main-body">
        <div className="cardnum">
          <p>showing {displayData.length} results</p>
        </div>

        <div className="comparison-detail">
          {displayData.map((item) => (
            <div key={item.id} className="card">
              <img className="image" src={item.image} alt={item.service} />

              <div className="card-description">
                <div className="card-section1">
                  <p className="cancellation-detail">{item.cancellation}</p>
                  <p className="reviews">
                    <span className="star">&#9733;</span>
                    <span className="rating">{item.rating}</span>
                    <span className="no-of-review">({item.reviews})</span>
                  </p>
                </div>

                <div className="card-section2">
                  <p className="service">{item.service}</p>
                </div>

                <div className="card-section3">
                  <p className="card-code">{item.category}</p>
                </div>

                <div className="card-section4">
                  <p className="service-description">{item.description}</p>
                </div>

                <div className="card-section5">
                  <span className="price">£{item.price.toFixed(2)}</span>
                  <span className="trip">per trip</span>
                </div>

                <div className="card-section6">
                  <p className="brand">{item.brand}</p>
                </div>
              </div>

              <div className="convenience-level">
                <p>Convenience</p>

                <div className="rating-wrapper">
                  <div className="rating-bar">
                    {[...Array(10)].map((_, i) => (
                      <span
                        key={i}
                        className={i < item.convenience ? 'segment-filled' : 'segment-unfilled'}
                      ></span>
                    ))}
                  </div>

                  <span className="card-rating">{item.convenience}/10</span>
                </div>
              </div>

              <div className="card-section7">
                <button className="view-details-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}