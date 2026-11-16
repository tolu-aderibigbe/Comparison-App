
import { describe, it, expect } from 'vitest'

import {
  ALL_TYPES,
  DEFAULT_SORT,
  filterAndSortData,
} from './filterSort'

// Small test dataset with deliberately varied prices and ratings.
const testData = [
  {
    id: 1,
    service: 'Product A',
    category: 'Travel Insurance',
    price: 30,
    rating: 4.5,
  },
  {
    id: 2,
    service: 'Product B',
    category: 'Airport Lounge',
    price: 20,
    rating: 4.8,
  },
  {
    id: 3,
    service: 'Product C',
    category: 'Airport Parking',
    price: 50,
    rating: 4.2,
  },
  {
    id: 4,
    service: 'Product D',
    category: 'Travel Insurance',
    price: 40,
    rating: 4.8,
  },
]

const getServices = (products) =>
  products.map((product) => product.service)

describe('filterAndSortData', () => {
  // --------------------------------
  // 1. FILTERING
  // --------------------------------

  describe('Filtering', () => {
    it('returns all products when All Types is selected', () => {
      const result = filterAndSortData(
        testData,
        ALL_TYPES,
        DEFAULT_SORT
      )

      expect(result).toHaveLength(4)

      expect(getServices(result)).toEqual([
        'Product B',
        'Product A',
        'Product D',
        'Product C',
      ])
    })

    it('returns only products matching the selected category', () => {
      const result = filterAndSortData(
        testData,
        'Travel Insurance',
        DEFAULT_SORT
      )

      expect(getServices(result)).toEqual([
        'Product A',
        'Product D',
      ])
    })

    it('returns an empty array when no products match the category', () => {
      const result = filterAndSortData(
        testData,
        'Non-existent Category',
        DEFAULT_SORT
      )

      expect(result).toEqual([])
    })
  })

  // --------------------------------
  // 2. SORTING
  // --------------------------------

  describe('Sorting', () => {
    it('sorts prices from low to high', () => {
      const result = filterAndSortData(
        testData,
        ALL_TYPES,
        'Price: Low to high'
      )

      expect(getServices(result)).toEqual([
        'Product B',
        'Product A',
        'Product D',
        'Product C',
      ])
    })

    it('sorts prices from high to low', () => {
      const result = filterAndSortData(
        testData,
        ALL_TYPES,
        'Price: High to low'
      )

      expect(getServices(result)).toEqual([
        'Product C',
        'Product D',
        'Product A',
        'Product B',
      ])
    })

    it('sorts ratings from high to low', () => {
      const result = filterAndSortData(
        testData,
        ALL_TYPES,
        'Rating: High to low'
      )

      // Products B and D both have a rating of 4.8.
      // Their original relative order is preserved.
      expect(getServices(result)).toEqual([
        'Product B',
        'Product D',
        'Product A',
        'Product C',
      ])
    })

    it('sorts ratings from low to high', () => {
      const result = filterAndSortData(
        testData,
        ALL_TYPES,
        'Rating: Low to high'
      )

      expect(getServices(result)).toEqual([
        'Product C',
        'Product A',
        'Product B',
        'Product D',
      ])
    })

    it('preserves the original order of products with identical prices', () => {
      const tiedData = [
        { ...testData[0], price: 50 },
        { ...testData[1], price: 50 },
        { ...testData[2], price: 20 },
      ]

      const result = filterAndSortData(
        tiedData,
        ALL_TYPES,
        'Price: High to low'
      )

      expect(getServices(result)).toEqual([
        'Product A',
        'Product B',
        'Product C',
      ])
    })
  })

  // --------------------------------
  // 3. IMMUTABILITY
  // --------------------------------

  describe('Data immutability', () => {
    it('does not modify the original data array when sorting', () => {
      const originalData = [...testData]

      filterAndSortData(
        testData,
        ALL_TYPES,
        'Price: High to low'
      )

      expect(testData).toEqual(originalData)
    })

    it('does not modify the original data array when filtering', () => {
      const originalData = [...testData]

      filterAndSortData(
        testData,
        'Travel Insurance',
        DEFAULT_SORT
      )

      expect(testData).toEqual(originalData)
    })
  })

  // --------------------------------
  // 4. UNKNOWN SORT OPTION
  // --------------------------------

  describe('Fallback behaviour', () => {
    it('preserves the filtered data order for an unknown sorting option', () => {
      const result = filterAndSortData(
        testData,
        ALL_TYPES,
        'Unknown sorting option'
      )

      expect(getServices(result)).toEqual([
        'Product A',
        'Product B',
        'Product C',
        'Product D',
      ])
    })
  })
})
