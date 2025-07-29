'use client'
import React from 'react'

interface GenericListProps<T> {
  items: T[]
  title: string
  colorScheme: 'yellow' | 'blue' | 'green' | 'purple' | 'orange'
  loading?: boolean
  renderItem: (item: T) => React.ReactNode
}

const colorSchemes = {
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400'
}

export default function GenericList<T>({
  items,
  title,
  colorScheme,
  loading = false,
  renderItem
}: GenericListProps<T>) {
  const titleColor = colorSchemes[colorScheme]

  return (
    <div>
      <h4 className={`${titleColor} text-sm font-medium mb-2`}>{title}:</h4>
      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {items.map((item, index) => (
          <li key={index}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
      {loading && (
        <p className="text-gray-400 animate-pulse text-sm mt-2">Loading...</p>
      )}
    </div>
  )
}