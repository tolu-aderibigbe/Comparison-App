
import React, { useState } from 'react'
import './header.css'
import './App.css'
import './dropdown.css'

import travelData from './data/travelData'

import {
  ALL_TYPES,
  DEFAULT_SORT,
  FILTER_TYPES,
  SORT_OPTIONS,
  filterAndSortData,
} from './filterSort'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState(ALL_TYPES)
  const [sortBy, setSortBy] = useState(DEFAULT_SORT)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const displayData = filterAndSortData(
    travelData,
    filterType,
    sortBy
  )

  return (
    <>
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
                  setShowTypeDropdown(!showTypeDropdown)
                  setShowSortDropdown(false)
                }}
              >
                {filterType}
              </button>

              {showTypeDropdown && (
                <div className="dropdown-menu">
                  {FILTER_TYPES.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${
                        filterType === option ? 'selected' : ''
                      }`}
                      onClick={() => {
                        setFilterType(option)
                        setShowTypeDropdown(false)
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
                  setShowSortDropdown(!showSortDropdown)
                  setShowTypeDropdown(false)
                }}
              >
                {sortBy}
              </button>

              {showSortDropdown && (
                <div className="dropdown-menu">
                  {SORT_OPTIONS.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${
                        sortBy === option ? 'selected' : ''
                      }`}
                      onClick={() => {
                        setSortBy(option)
                        setShowSortDropdown(false)
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
              setFilterType(ALL_TYPES)
              setSortBy(DEFAULT_SORT)
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
              <img
                className="image"
                src={item.image}
                alt={item.service}
              />

              <div className="card-description">
                <div className="card-section1">
                  <p className="cancellation-detail">
                    {item.cancellation}
                  </p>

                  <p className="reviews">
                    <span className="star">&#9733;</span>
                    <span className="rating">{item.rating}</span>
                    <span className="no-of-review">
                      ({item.reviews})
                    </span>
                  </p>
                </div>

                <div className="card-section2">
                  <p className="service">{item.service}</p>
                </div>

                <div className="card-section3">
                  <p className="card-code">{item.category}</p>
                </div>

                <div className="card-section4">
                  <p className="service-description">
                    {item.description}
                  </p>
                </div>

                <div className="card-section5">
                  <span className="price">
                    £{item.price.toFixed(2)}
                  </span>
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
                        className={
                          i < item.convenience
                            ? 'segment-filled'
                            : 'segment-unfilled'
                        }
                      ></span>
                    ))}
                  </div>

                  <span className="card-rating">
                    {item.convenience}/10
                  </span>
                </div>
              </div>

              <div className="card-section7">
                <button className="view-details-button">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
