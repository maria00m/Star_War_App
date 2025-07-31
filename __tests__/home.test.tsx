import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../src/app/page'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>
  }
})

describe('Home Page', () => {
  it('shows welcome text', () => {
    render(<Home />)
    
    expect(screen.getByText('WELCOME')).toBeInTheDocument()
    expect(screen.getByText('To a Galaxy Far, Far Away...')).toBeInTheDocument()
  })

  it('shows explore button', () => {
    render(<Home />)
    
    expect(screen.getByText('EXPLORE GALAXY')).toBeInTheDocument()
  })

  it('shows star wars quote', () => {
    render(<Home />)
    
    expect(screen.getByText('"May the Force be with you"')).toBeInTheDocument()
  })
})