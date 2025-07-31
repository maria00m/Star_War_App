'use client'
import React from 'react'

/**
 * @interface GenericListProps
 * @description Props interface for the GenericList component that renders a list of items with customizable styling
 */
interface GenericListProps<T> {
  /** @type {T[]} Array of items to render in the list */
  items: T[]
  /** @type {string} Title to display above the list */
  title: string
  /** @type {'yellow' | 'blue' | 'green' | 'purple' | 'orange'} Color scheme for the list styling */
  colorScheme: 'yellow' | 'blue' | 'green' | 'purple' | 'orange'
  /** @type {boolean} Whether the list is currently loading, defaults to false */
  loading?: boolean
  /** @type {(item: T) => React.ReactNode} Function to render each individual item */
  renderItem: (item: T) => React.ReactNode
}

/**
 * @constant colorSchemes
 * @description Color scheme mappings for different list themes
 */
const colorSchemes = {
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400'
}

/**
 * @function GenericList
 * @description A reusable list component that renders items with customizable styling and loading states
 * @template T - The type of items in the list
 * @param {GenericListProps<T>} props - The props for the GenericList component
 * @returns {JSX.Element} A styled list component with title and items
 */
export default function GenericList<T>({
  items,
  title,
  colorScheme,
  loading = false,
  renderItem
}: GenericListProps<T>) {
  const titleColor = colorSchemes[colorScheme]

  return (
    <div className="w-full">
      <h4 className={`${titleColor} text-sm font-medium mb-3 uppercase tracking-wide`}>
        {title}:
      </h4>
      
      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
          {items.map((item, index) => (
            <li key={index} className="text-gray-300 text-sm">
              {renderItem(item)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">No {title.toLowerCase()} available</p>
      )}
      
      {loading && (
        <p className="text-gray-400 animate-pulse text-sm mt-2">
          Loading {title.toLowerCase()}...
        </p>
      )}
    </div>
  )
}