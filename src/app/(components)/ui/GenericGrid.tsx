'use client'
import React from 'react'

/**
 * @interface GenericGridProps
 * @description Props interface for the GenericGrid component that provides a reusable grid layout with loading, error, and empty states
 */
interface GenericGridProps {
  /** @type {React.ReactNode} The child components to render within the grid */
  children: React.ReactNode
  /** @type {boolean} Whether the grid is currently in a loading state */
  loading: boolean
  /** @type {string | null} Error message to display, null if no error */
  error: string | null
  /** @type {() => void} Callback function to retry loading data */
  onRetry: () => void
  /** @type {string} Message to display when there are no items to show */
  emptyMessage: string
  /** @type {object} Optional grid column configuration for different screen sizes */
  gridCols?: {
    /** @type {number} Number of columns on small screens */
    sm?: number
    /** @type {number} Number of columns on medium screens */
    md?: number
    /** @type {number} Number of columns on large screens */
    lg?: number
    /** @type {number} Number of columns on extra large screens */
    xl?: number
  }
}

/**
 * @function GenericGrid
 * @description A reusable grid component that handles loading, error, and empty states with responsive column layouts
 * @param {GenericGridProps} props - The props for the GenericGrid component
 * @returns {JSX.Element} A responsive grid layout with state management
 */
export default function GenericGrid({
  children,
  loading,
  error,
  onRetry,
  emptyMessage,
  gridCols = { sm: 1, md: 2, lg: 3, xl: 4 }
}: GenericGridProps) {
  
  /**
   * @description Renders loading state with centered spinner
   * @returns {JSX.Element} Loading component
   */
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-yellow-400 text-lg animate-pulse">Loading...</div>
      </div>
    )
  }

  /**
   * @description Renders error state with retry button
   * @returns {JSX.Element} Error component with retry functionality
   */
  if (error) {
    return (
      <div className="text-red-400 p-4 text-center">
        <p className="mb-2">Error: {error}</p>
        <button 
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    )
  }

  /**
   * @description Renders empty state when no children are provided
   * @returns {JSX.Element} Empty state component with refresh option
   */
  if (!React.Children.count(children)) {
    return (
      <div className="text-gray-400 p-4 text-center">
        <p className="mb-2">{emptyMessage}</p>
        <button 
          onClick={onRetry}
          className="ml-2 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors duration-200"
        >
          Refresh
        </button>
      </div>
    )
  }

  /**
   * @description Constructs responsive grid CSS classes based on gridCols configuration
   * @type {string} Complete CSS class string for the grid layout
   */
  const gridClass = `grid gap-6 p-4 ${
    gridCols.sm ? `grid-cols-${gridCols.sm}` : 'grid-cols-1'
  } ${
    gridCols.md ? `sm:grid-cols-${gridCols.md}` : ''
  } ${
    gridCols.lg ? `lg:grid-cols-${gridCols.lg}` : ''
  } ${
    gridCols.xl ? `xl:grid-cols-${gridCols.xl}` : ''
  }`.replace(/\s+/g, ' ').trim()

  /**
   * @description Renders the main grid layout with children
   * @returns {JSX.Element} Grid container with responsive layout
   */
  return <div className={gridClass}>{children}</div>
}