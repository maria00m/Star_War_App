'use client'

import { Button, Card, CardBody } from '@nextui-org/react'

/**
 * @interface GenericErrorStateProps
 * @description Props interface for the GenericErrorState component that displays error messages with retry functionality
 */
interface GenericErrorStateProps {
  /** @type {string} The error message to display */
  error: string
  /** @type {() => void} Optional callback function to retry the failed operation */
  onRetry?: () => void
  /** @type {string} Optional title for the error state, defaults to "Something went wrong" */
  title?: string
}

/**
 * @function GenericErrorState
 * @description A reusable error state component that displays error messages with optional retry functionality
 * @param {GenericErrorStateProps} props - The props for the GenericErrorState component
 * @returns {JSX.Element} A styled error state component with retry option
 */
export default function GenericErrorState({
  error,
  onRetry,
  title = 'Something went wrong'
}: GenericErrorStateProps) {
  return (
    <div className="flex justify-center items-center p-8 min-h-[200px]">
      <Card className="max-w-md w-full bg-gray-800 border border-red-400/20">
        <CardBody className="text-center p-6">
          <div className="mb-4">
            <svg 
              className="w-12 h-12 text-red-400 mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <h3 className="text-red-400 text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 mb-4 text-sm leading-relaxed">{error}</p>
          {onRetry && (
            <Button 
              color="primary"
              onClick={onRetry}
              variant="flat"
              className="bg-red-400/10 text-red-400 hover:bg-red-400/20 border border-red-400/30"
            >
              Try Again
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  )
}