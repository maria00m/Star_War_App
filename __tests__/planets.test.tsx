import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CharacterDetails from '../src/app/(components)/characterDetails/page'

// Mock the loading spinner
jest.mock('../src/app/(components)/ui/NextUISpinner', () => {
  return function MockSpinner() {
    return <div>Loading characters...</div>
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

describe('Character Details', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<CharacterDetails />)
    expect(screen.getByText('Loading characters...')).toBeInTheDocument()
  })
})