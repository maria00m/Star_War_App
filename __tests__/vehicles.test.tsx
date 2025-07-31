import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import VehicleDetails from '../src/app/(components)/vehiclesDetails/page'

// Mock the loading spinner
jest.mock('../src/app/(components)/ui/NextUISpinner', () => {
  return function MockSpinner() {
    return <div>Loading vehicles...</div>
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

describe('Vehicle Details', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<VehicleDetails />)
    expect(screen.getByText('Loading vehicles...')).toBeInTheDocument()
  })
})