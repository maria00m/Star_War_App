'use client'
import React, { useEffect } from 'react'

/**
 * @interface ModalProps
 * @description Props interface for the Modal component that provides a customizable overlay dialog
 */
interface ModalProps {
  /** @type {boolean} Whether the modal is currently open/visible */
  isOpen: boolean
  /** @type {() => void} Callback function to close the modal */
  onClose: () => void
  /** @type {string} Title to display in the modal header */
  title: string
  /** @type {React.ReactNode} Content to render inside the modal body */
  children: React.ReactNode
  /** @type {string} Optional custom CSS classes for the modal container */
  className?: string
  /** @type {'sm' | 'md' | 'lg' | 'xl' | 'full'} Size variant for the modal, defaults to 'lg' */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * @constant sizeClasses
 * @description CSS class mappings for different modal sizes
 */
const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
}

/**
 * @function Modal
 * @description A reusable modal component with backdrop, header, and customizable content area
 * @param {ModalProps} props - The props for the Modal component
 * @returns {JSX.Element | null} A modal dialog or null if not open
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'lg'
}: ModalProps) {
  
  /**
   * @description Effect to handle escape key press and body scroll lock
   */
  useEffect(() => {
    if (!isOpen) return

    /**
     * @function handleEscapeKey
     * @description Closes modal when escape key is pressed
     * @param {KeyboardEvent} event - The keyboard event
     */
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscapeKey)

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  /**
   * @function handleBackdropClick
   * @description Closes modal when clicking on the backdrop (outside the modal content)
   * @param {React.MouseEvent} event - The mouse event
   */
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  // Don't render anything if modal is not open
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`
          relative w-full ${sizeClasses[size]} max-h-[90vh] 
          bg-gray-900 rounded-lg shadow-2xl border border-gray-700
          transform transition-all duration-300 ease-out
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 
            id="modal-title"
            className="text-xl font-bold text-white truncate pr-4"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-800"
            aria-label="Close modal"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}