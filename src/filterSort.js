
// Shared filter and sorting constants
export const ALL_TYPES = 'All Types'

export const DEFAULT_SORT = 'Price: Low to high'

export const FILTER_TYPES = [
  ALL_TYPES,
  'Travel Insurance',
  'Airport Lounge',
  'Airport Parking',
]

export const SORT_OPTIONS = [
  DEFAULT_SORT,
  'Price: High to low',
  'Rating: High to low',
  'Rating: Low to high',
]

// Lookup object containing the sorting functions.
// Each function compares two products and returns the sort result.
const SORT_COMPARATORS = {
  [DEFAULT_SORT]: (a, b) => a.price - b.price,

  'Price: High to low': (a, b) => b.price - a.price,

  'Rating: High to low': (a, b) => b.rating - a.rating,

  'Rating: Low to high': (a, b) => a.rating - b.rating,
}

// Pure function: filters and sorts data without modifying the original array.
export function filterAndSortData(data, filterType, sortBy) {
  let result = [...data]

  // Filter by category
  if (filterType !== ALL_TYPES) {
    result = result.filter(
      (item) => item.category === filterType
    )
  }

  // Sort using the selected comparator
  const comparator = SORT_COMPARATORS[sortBy]

  if (comparator) {
    result.sort(comparator)
  }

  return result
}
