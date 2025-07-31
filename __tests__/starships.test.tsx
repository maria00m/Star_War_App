import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StarshipDetails from '../src/app/(components)/starShipDetails/page'

// Mock the loading spinner
jest.mock('../src/app/(components)/ui/NextUISpinner', () => {
  return function MockSpinner() {
    return <div>Loading starships...</div>
  }
})

// Mock the Modal component
jest.mock('../src/app/(components)/ui/Modal', () => {
  return function MockModal() {
    return <div>Mock Modal</div>
  }
})

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([])
  })
) as jest.Mock

describe('Starship Details', () => {
  it('renders without crashing', () => {
    render(<StarshipDetails />)
    expect(screen.getByText('Loading starships...')).toBeInTheDocument()
  })
})