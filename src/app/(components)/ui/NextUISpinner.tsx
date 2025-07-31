import { Spinner } from '@nextui-org/react'

interface NextUISpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  message?: string
}
/**
 * Loading spinner component with customizable appearance
 * @param {string} size - Spinner size: 'sm' | 'md' | 'lg'
 * @param {string} color - Spinner color: 'primary' | 'warning' | 'success'
 * @param {string} message - Loading message to display
 * @returns {JSX.Element} Loading spinner component
 */
export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  message = 'Loading...' 
}: NextUISpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Spinner implementation */}
      <Spinner size={size} color={color} />
      {message && (
        <p className="mt-3 text-sm text-default-500">
          {message}
        </p>
      )}
    </div>
  )
}