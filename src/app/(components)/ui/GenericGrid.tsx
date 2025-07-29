'use client'
import React from 'react'

interface GenericGridProps {
  children: React.ReactNode
  loading: boolean
  error: string | null
  onRetry: () => void
  emptyMessage: string
  gridCols?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export default function GenericGrid({
  children,
  loading,
  error,
  onRetry,
  emptyMessage,
  gridCols = { sm: 1, md: 2, lg: 3, xl: 4 }
}: GenericGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-yellow-400 text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-400 p-4 text-center">
        <p>Error: {error}</p>
        <button 
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!React.Children.count(children)) {
    return (
      <div className="text-gray-400 p-4 text-center">
        {emptyMessage}
        <button 
          onClick={onRetry}
          className="ml-2 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
        >
          Refresh
        </button>
      </div>
    )
  }

  const gridClass = `grid gap-6 p-4 ${
    gridCols.sm ? `grid-cols-${gridCols.sm}` : 'grid-cols-1'
  } ${
    gridCols.md ? `md:grid-cols-${gridCols.md}` : ''
  } ${
    gridCols.lg ? `lg:grid-cols-${gridCols.lg}` : ''
  } ${
    gridCols.xl ? `xl:grid-cols-${gridCols.xl}` : ''
  }`

  return <div className={gridClass}>{children}</div>
}