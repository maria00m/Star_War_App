import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FilmDetails from '../src/app/(components)/filmDetails/page'

// Mock the loading spinner
jest.mock('../src/app/(components)/ui/NextUISpinner', () => {
  return function MockSpinner() {
    return <div>Loading films...</div>
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

describe('Film Details', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<FilmDetails />)
    expect(screen.getByText('Loading films...')).toBeInTheDocument()
  })
})