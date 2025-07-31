'use client'
import React from 'react'

/**
 * @interface GenericCardProps
 * @description Props interface for the GenericCard component that provides a reusable card layout
 */
interface GenericCardProps {
  /** @type {string} The main title displayed in the card header */
  title: string
  /** @type {string} Optional subtitle text displayed below the title */
  subtitle?: string
  /** @type {Record<string, string>} Data object containing key-value pairs to display in the card */
  data?: Record<string, string>
  /** @type {'yellow' | 'blue' | 'green' | 'purple' | 'orange'} Color scheme identifier for theming the card */
  colorScheme: 'yellow' | 'blue' | 'green' | 'purple' | 'orange'
  /** @type {boolean} Whether the card is currently in expanded state */
  isExpanded: boolean
  /** @type {() => void} Callback function triggered when expand/collapse button is clicked */
  onToggleExpand: () => void
  /** @type {string} Text to display on the expand/collapse button */
  expandButtonText: string
  /** @type {React.ReactNode} Additional content to show when card is expanded */
  expandedContent?: React.ReactNode
  /** @type {React.ReactNode} Optional children components to render inside the card */
  children?: React.ReactNode
}

/**
 * @constant colorSchemes
 * @description Predefined color schemes for different card themes with comprehensive styling options
 * @type {Record<string, object>}
 */
const colorSchemes = {
  /** @type {object} Yellow color scheme with warm golden tones */
  yellow: {
    /** @type {string} Border styling classes for yellow theme */
    border: 'border-yellow-400/20 hover:border-yellow-400/50',
    /** @type {string} Title text color class for yellow theme */
    title: 'text-yellow-400',
    /** @type {string} Button styling classes for normal state in yellow theme */
    button: 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20',
    /** @type {string} Button styling classes for expanded state in yellow theme */
    buttonExpanded: 'bg-yellow-400/30 text-yellow-300',
    /** @type {string} Divider border styling class for yellow theme */
    divider: 'border-yellow-400/20'
  },
  /** @type {object} Blue color scheme with cool blue tones */
  blue: {
    /** @type {string} Border styling classes for blue theme */
    border: 'border-blue-400/20 hover:border-blue-400/50',
    /** @type {string} Title text color class for blue theme */
    title: 'text-blue-400',
    /** @type {string} Button styling classes for normal state in blue theme */
    button: 'bg-blue-400/10 text-blue-400 hover:bg-blue-400/20',
    /** @type {string} Button styling classes for expanded state in blue theme */
    buttonExpanded: 'bg-blue-400/30 text-blue-300',
    /** @type {string} Divider border styling class for blue theme */
    divider: 'border-blue-400/20'
  },
  /** @type {object} Green color scheme with natural green tones */
  green: {
    /** @type {string} Border styling classes for green theme */
    border: 'border-green-400/20 hover:border-green-400/50',
    /** @type {string} Title text color class for green theme */
    title: 'text-green-400',
    /** @type {string} Button styling classes for normal state in green theme */
    button: 'bg-green-400/10 text-green-400 hover:bg-green-400/20',
    /** @type {string} Button styling classes for expanded state in green theme */
    buttonExpanded: 'bg-green-400/30 text-green-300',
    /** @type {string} Divider border styling class for green theme */
    divider: 'border-green-400/20'
  },
  /** @type {object} Purple color scheme with royal purple tones */
  purple: {
    /** @type {string} Border styling classes for purple theme */
    border: 'border-purple-400/20 hover:border-purple-400/50',
    /** @type {string} Title text color class for purple theme */
    title: 'text-purple-400',
    /** @type {string} Button styling classes for normal state in purple theme */
    button: 'bg-purple-400/10 text-purple-400 hover:bg-purple-400/20',
    /** @type {string} Button styling classes for expanded state in purple theme */
    buttonExpanded: 'bg-purple-400/30 text-purple-300',
    /** @type {string} Divider border styling class for purple theme */
    divider: 'border-purple-400/20'
  },
  /** @type {object} Orange color scheme with vibrant orange tones */
  orange: {
    /** @type {string} Border styling classes for orange theme */
    border: 'border-orange-400/20 hover:border-orange-400/50',
    /** @type {string} Title text color class for orange theme */
    title: 'text-orange-400',
    /** @type {string} Button styling classes for normal state in orange theme */
    button: 'bg-orange-400/10 text-orange-400 hover:bg-orange-400/20',
    /** @type {string} Button styling classes for expanded state in orange theme */
    buttonExpanded: 'bg-orange-400/30 text-orange-300',
    /** @type {string} Divider border styling class for orange theme */
    divider: 'border-orange-400/20'
  }
}

/**
 * @function GenericCard
 * @description A reusable card component with expandable content and customizable color schemes
 * @param {GenericCardProps} props - The props for the GenericCard component
 * @returns {JSX.Element} A styled card component with optional expandable content
 */
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