'use client'
import React from 'react'

interface GenericCardProps {
  title: string
  subtitle?: string
  data?: Record<string, string>
  colorScheme: 'yellow' | 'blue' | 'green' | 'purple' | 'orange'
  isExpanded: boolean
  onToggleExpand: () => void
  expandButtonText: string
  expandedContent?: React.ReactNode
  children?: React.ReactNode
}

const colorSchemes = {
  yellow: {
    border: 'border-yellow-400/20 hover:border-yellow-400/50',
    title: 'text-yellow-400',
    button: 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20',
    buttonExpanded: 'bg-yellow-400/30 text-yellow-300',
    divider: 'border-yellow-400/20'
  },
  blue: {
    border: 'border-blue-400/20 hover:border-blue-400/50',
    title: 'text-blue-400',
    button: 'bg-blue-400/10 text-blue-400 hover:bg-blue-400/20',
    buttonExpanded: 'bg-blue-400/30 text-blue-300',
    divider: 'border-blue-400/20'
  },
  green: {
    border: 'border-green-400/20 hover:border-green-400/50',
    title: 'text-green-400',
    button: 'bg-green-400/10 text-green-400 hover:bg-green-400/20',
    buttonExpanded: 'bg-green-400/30 text-green-300',
    divider: 'border-green-400/20'
  },
  purple: {
    border: 'border-purple-400/20 hover:border-purple-400/50',
    title: 'text-purple-400',
    button: 'bg-purple-400/10 text-purple-400 hover:bg-purple-400/20',
    buttonExpanded: 'bg-purple-400/30 text-purple-300',
    divider: 'border-purple-400/20'
  },
  orange: {
    border: 'border-orange-400/20 hover:border-orange-400/50',
    title: 'text-orange-400',
    button: 'bg-orange-400/10 text-orange-400 hover:bg-orange-400/20',
    buttonExpanded: 'bg-orange-400/30 text-orange-300',
    divider: 'border-orange-400/20'
  }
}

export default function GenericCard({
  title,
  subtitle,
  data,
  colorScheme,
  isExpanded,
  onToggleExpand,
  expandButtonText,
  expandedContent,
  children
}: GenericCardProps) {
  const colors = colorSchemes[colorScheme]

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg border ${colors.border} transition-colors`}>
      <div className={`bg-black/50 py-3 px-4 border-b ${colors.divider}`}>
        <h2 className={`${colors.title} text-xl font-bold truncate`}>{title}</h2>
        {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      </div>
      
      <div className="p-4">
        {data && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <p className="text-gray-400 text-xs uppercase">{key}</p>
                <p className="text-white text-sm">{value}</p>
              </div>
            ))}
          </div>
        )}
        
        {children}
        
        <button
          onClick={onToggleExpand}
          className={`w-full py-1 px-2 rounded-full text-xs font-medium transition-colors ${
            isExpanded ? colors.buttonExpanded : colors.button
          }`}
        >
          {expandButtonText}
        </button>
        
        {isExpanded && expandedContent && (
          <div className={`mt-3 pt-2 border-t ${colors.divider}`}>
            {expandedContent}
          </div>
        )}
      </div>
    </div>
  )
}