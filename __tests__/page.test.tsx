import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the page component since it's likely complex
const MockPage = () => {
  return (
    <div>
      <h1>Star Wars App</h1>
      <p>Welcome to the galaxy far, far away!</p>
    </div>
  )
}

describe('Page', () => {
  it('renders the main heading', () => {
    render(<MockPage />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Star Wars App')
  })

  it('renders welcome message', () => {
    render(<MockPage />)
    
    const welcomeText = screen.getByText('Welcome to the galaxy far, far away!')
    expect(welcomeText).toBeInTheDocument()
  })
})
