
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

import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ProductCard from './components/ProductCard'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState(ALL_TYPES)
  const [sortBy, setSortBy] = useState(DEFAULT_SORT)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const displayData = filterAndSortData(
    travelData,
    filterType,
    sortBy,
    searchQuery
  )

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <FilterBar
        filterType={filterType}
        sortBy={sortBy}
        showTypeDropdown={showTypeDropdown}
        showSortDropdown={showSortDropdown}
        onToggleTypeDropdown={() => {
          setShowTypeDropdown(!showTypeDropdown)
          setShowSortDropdown(false)
        }}
        onToggleSortDropdown={() => {
          setShowSortDropdown(!showSortDropdown)
          setShowTypeDropdown(false)
        }}
        onSelectFilterType={(option) => {
          setFilterType(option)
          setShowTypeDropdown(false)
        }}
        onSelectSortBy={(option) => {
          setSortBy(option)
          setShowSortDropdown(false)
        }}
        onReset={() => {
          setFilterType(ALL_TYPES)
          setSortBy(DEFAULT_SORT)
          setSearchQuery('')
        }}
        filterTypes={FILTER_TYPES}
        sortOptions={SORT_OPTIONS}
      />

      <div className="main-body">
        <div className="cardnum">
          <p>showing {displayData.length} results</p>
        </div>

        <div className="comparison-detail">
          {displayData.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </>
  )
}
