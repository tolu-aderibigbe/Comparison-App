
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from 'vitest'

import {
  render,
  screen,
  within,
  cleanup,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

import App from './App'

// Clean up the rendered application after every test.
afterEach(() => {
  cleanup()
})

// The service names currently displayed by the application.
const serviceNames = [
  'Single Trip Insurance',
  'Priority Pass Lounge',
  'Economy parking',
  'Executive Lounge Access',
  'Business Lounge',
  'Premium Insurance Plus',
  'Long Stay Parking',
  'Short Stay Parking',
  'Meet & Greet Parking',
  'Annual Multi-Trip Insurance',
]

// Find the filter button using its persistent label.
const getFilterButton = () => {
  const filterSection = screen.getByText('Filter by type').parentElement

  return within(filterSection).getByRole('button')
}

// Find the sorting button using its persistent label.
const getSortButton = () => {
  const sortSection = screen.getByText('Sort by').parentElement

  return within(sortSection).getByRole('button')
}

// Find the product cards through their visible View Details buttons.
// No CSS class names are needed.
const getCards = () => {
  return screen
    .getAllByRole('button', { name: 'View Details' })
    .map((button) => button.parentElement.parentElement)
}

// Return the currently displayed services in their visual order.
const getDisplayedServices = () => {
  const cards = getCards()

  return cards.map((card) => {
    const service = serviceNames.find((name) =>
      within(card).queryByText(name, { exact: true })
    )

    return service
  })
}

// Find an individual product card by its visible service name.
const getCardByService = (serviceName) => {
  return getCards().find((card) =>
    within(card).queryByText(serviceName, { exact: true })
  )
}

// Select a category from the filter dropdown.
const selectFilter = async (user, category) => {
  const filterButton = getFilterButton()

  await user.click(filterButton)

  // Search only inside the filter dropdown.
  await user.click(
    within(filterButton.parentElement).getByText(category, {
      exact: true,
    })
  )
}

// Select a sorting option from the sorting dropdown.
const selectSort = async (user, option) => {
  const sortButton = getSortButton()

  await user.click(sortButton)

  // Search only inside the sorting dropdown.
  await user.click(
    within(sortButton.parentElement).getByText(option, {
      exact: true,
    })
  )
}

describe('App comparison functionality', () => {
  beforeEach(() => {
    render(<App />)
  })

  // --------------------------------
  // 1. FILTERING
  // --------------------------------

  describe('Filtering', () => {
    it.each([
      ['Travel Insurance', 3],
      ['Airport Lounge', 3],
      ['Airport Parking', 4],
    ])(
      'filters products by %s',
      async (category, expectedCount) => {
        const user = userEvent.setup()

        await selectFilter(user, category)

        // Check the displayed result count.
        expect(
          screen.getByText(`showing ${expectedCount} results`)
        ).toBeInTheDocument()

        // Check the number of displayed products.
        const cards = getCards()

        expect(cards).toHaveLength(expectedCount)

        // Check that every displayed card belongs to the selected category.
        cards.forEach((card) => {
          expect(
            within(card).getByText(category, { exact: true })
          ).toBeInTheDocument()
        })
      }
    )

    it('allows the filter to be changed after an earlier selection', async () => {
      const user = userEvent.setup()

      await selectFilter(user, 'Airport Parking')

      expect(
        screen.getByText('showing 4 results')
      ).toBeInTheDocument()

      // The helper must still find the filter button after its label changes.
      await selectFilter(user, 'Travel Insurance')

      expect(
        screen.getByText('showing 3 results')
      ).toBeInTheDocument()

      getCards().forEach((card) => {
        expect(
          within(card).getByText('Travel Insurance', { exact: true })
        ).toBeInTheDocument()
      })
    })
  })

  // --------------------------------
  // 2. SORTING
  // --------------------------------

  describe('Sorting', () => {
    it('displays products by price from low to high by default', () => {
      const services = getDisplayedServices()

      expect(services[0]).toBe('Single Trip Insurance')
      expect(services[1]).toBe('Priority Pass Lounge')
      expect(services[2]).toBe('Economy parking')
    })

    it('sorts prices from high to low', async () => {
      const user = userEvent.setup()

      await selectSort(user, 'Price: High to low')

      const services = getDisplayedServices()

      expect(services[0]).toBe('Meet & Greet Parking')
      expect(services[1]).toBe('Annual Multi-Trip Insurance')
      expect(services[2]).toBe('Short Stay Parking')
    })

    it('sorts ratings from high to low', async () => {
      const user = userEvent.setup()

      await selectSort(user, 'Rating: High to low')

      const services = getDisplayedServices()

      expect(services[0]).toBe('Premium Insurance Plus')

      // The two 4.8-rated products should occupy the next two positions.
      expect(new Set(services.slice(1, 3))).toEqual(
        new Set([
          'Meet & Greet Parking',
          'Annual Multi-Trip Insurance',
        ])
      )
    })

    it('sorts ratings from low to high', async () => {
      const user = userEvent.setup()

      await selectSort(user, 'Rating: Low to high')

      const services = getDisplayedServices()

      expect(services[0]).toBe('Economy parking')
      expect(services[1]).toBe('Priority Pass Lounge')
      expect(services[2]).toBe('Short Stay Parking')
      expect(services[3]).toBe('Long Stay Parking')
      expect(services[4]).toBe('Executive Lounge Access')
    })

    it('handles products with identical prices without assuming their relative order', async () => {
      const user = userEvent.setup()

      await selectSort(user, 'Price: High to low')

      const tiedServices = [
        'Meet & Greet Parking',
        'Annual Multi-Trip Insurance',
      ]

      const services = getDisplayedServices()

      // Both products must occupy the first two positions.
      expect(new Set(services.slice(0, 2))).toEqual(
        new Set(tiedServices)
      )

      // Both products must have the same displayed price.
      tiedServices.forEach((service) => {
        const card = getCardByService(service)

        expect(
          within(card).getByText('£89.99', { exact: true })
        ).toBeInTheDocument()
      })
    })

    it('handles products with identical ratings without assuming their relative order', async () => {
      const user = userEvent.setup()

      await selectSort(user, 'Rating: High to low')

      const tiedServices = [
        'Meet & Greet Parking',
        'Annual Multi-Trip Insurance',
      ]

      const services = getDisplayedServices()

      // Both 4.8-rated products should appear immediately after the 4.9 product.
      expect(new Set(services.slice(1, 3))).toEqual(
        new Set(tiedServices)
      )

      // Verify that both products really have a rating of 4.8.
      tiedServices.forEach((service) => {
        const card = getCardByService(service)

        expect(
          within(card).getByText('4.8', { exact: true })
        ).toBeInTheDocument()
      })
    })
  })

  // --------------------------------
  // 3. RESET FUNCTIONALITY
  // --------------------------------

  describe('Reset functionality', () => {
    it('resets the category and sorting options to their defaults', async () => {
      const user = userEvent.setup()

      await selectFilter(user, 'Airport Parking')

      await selectSort(user, 'Rating: High to low')

      await user.click(
        screen.getByRole('button', { name: 'Reset Filter' })
      )

      // Check the default filter selection.
      expect(getFilterButton()).toHaveTextContent('All Types')

      // Check the default sorting selection.
      expect(getSortButton()).toHaveTextContent('Price: Low to high')

      // Check that all ten products are displayed again.
      expect(
        screen.getByText('showing 10 results')
      ).toBeInTheDocument()

      // Check that the original price sorting is restored.
      const services = getDisplayedServices()

      expect(services[0]).toBe('Single Trip Insurance')
      expect(services[1]).toBe('Priority Pass Lounge')
      expect(services[2]).toBe('Economy parking')
    })

    it('allows another filter to be selected after resetting', async () => {
      const user = userEvent.setup()

      await selectFilter(user, 'Airport Parking')

      await user.click(
        screen.getByRole('button', { name: 'Reset Filter' })
      )

      await selectFilter(user, 'Airport Lounge')

      expect(
        screen.getByText('showing 3 results')
      ).toBeInTheDocument()
    })
  })

  // --------------------------------
  // 4. RESULT COUNT
  // --------------------------------

  describe('Result count', () => {
    it('displays ten results when the application first loads', () => {
      expect(
        screen.getByText('showing 10 results')
      ).toBeInTheDocument()
    })

    it('updates the result count when a category is selected', async () => {
      const user = userEvent.setup()

      await selectFilter(user, 'Travel Insurance')

      expect(
        screen.getByText('showing 3 results')
      ).toBeInTheDocument()
    })

    it('restores the result count to ten after resetting', async () => {
      const user = userEvent.setup()

      await selectFilter(user, 'Airport Lounge')

      expect(
        screen.getByText('showing 3 results')
      ).toBeInTheDocument()

      await user.click(
        screen.getByRole('button', { name: 'Reset Filter' })
      )

      expect(
        screen.getByText('showing 10 results')
      ).toBeInTheDocument()
    })
  })
})
