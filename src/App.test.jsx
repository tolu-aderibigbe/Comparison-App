import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

import App from './App'

// Helper function to get the displayed services in their current order
const getDisplayedServices = () => {
  return Array.from(document.querySelectorAll('.card .service'))
    .map((element) => element.textContent)
}

// Helper function to select a filter category
const selectFilter = async (user, category) => {
  await user.click(
    screen.getByRole('button', { name: 'All Types' })
  )

  await user.click(screen.getByText(category, { exact: true }))
}

// Helper function to select a sorting option
const selectSort = async (user, option) => {
  // Open the sorting dropdown
  await user.click(
    screen.getByRole('button', { name: 'Price: Low to high' })
  )

  // Select the requested sorting option
  await user.click(screen.getByText(option, { exact: true }))
}

describe('App comparison functionality', () => {
  beforeEach(() => {
    render(<App />)
  })

  // --------------------------------
  // 1. FILTERING TESTS
  // --------------------------------

  describe('Filtering', () => {
    it.each([
      {
        category: 'Travel Insurance',
        expectedCount: 3,
      },
      {
        category: 'Airport Lounge',
        expectedCount: 3,
      },
      {
        category: 'Airport Parking',
        expectedCount: 4,
      },
    ])(
      'filters results by $category',
      async ({ category, expectedCount }) => {
        const user = userEvent.setup()

        await selectFilter(user, category)

        expect(
          screen.getByText(`showing ${expectedCount} results`)
        ).toBeInTheDocument()

        const services = getDisplayedServices()

        expect(services).toHaveLength(expectedCount)

        // Every displayed card should belong to the selected category
        const categoryLabels = document.querySelectorAll(
          '.card .card-code'
        )

        categoryLabels.forEach((element) => {
          expect(element.textContent).toBe(category)
        })
      }
    )
  })

  // --------------------------------
  // 2. SORTING TESTS
  // --------------------------------

  describe('Sorting', () => {
    it('sorts prices from low to high by default', () => {
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
      expect(services[1]).toBe('Meet & Greet Parking')
      expect(services[2]).toBe('Annual Multi-Trip Insurance')
    })

    it('sorts ratings from low to high', async () => {
      const user = userEvent.setup()

      await selectSort(user, 'Rating: Low to high')

      const services = getDisplayedServices()

      expect(services[0]).toBe('Economy parking')
      expect(services[1]).toBe('Executive Lounge Access')
      expect(services[2]).toBe('Priority Pass Lounge')
    })
  })

  // --------------------------------
  // 3. RESET TEST
  // --------------------------------

  describe('Reset functionality', () => {
    it('resets the filter and sorting options to their defaults', async () => {
      const user = userEvent.setup()

      // Apply a category filter
      await selectFilter(user, 'Airport Parking')

      // Change the sorting option
      await selectSort(user, 'Rating: High to low')

      // Click the reset button
      await user.click(
        screen.getByRole('button', { name: 'Reset Filter' })
      )

      // Check that filter and sorting labels are restored
      expect(
        screen.getByRole('button', { name: 'All Types' })
      ).toBeInTheDocument()

      expect(
        screen.getByRole('button', { name: 'Price: Low to high' })
      ).toBeInTheDocument()

      // All ten products should be displayed again
      expect(
        screen.getByText('showing 10 results')
      ).toBeInTheDocument()

      // Default price sorting should be restored
      const services = getDisplayedServices()

      expect(services[0]).toBe('Single Trip Insurance')
      expect(services[1]).toBe('Priority Pass Lounge')
    })
  })

  // --------------------------------
  // 4. RESULT COUNT TESTS
  // --------------------------------

  describe('Result count', () => {
    it('displays 10 results when the application first loads', () => {
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

    it('returns the result count to 10 after resetting', async () => {
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
