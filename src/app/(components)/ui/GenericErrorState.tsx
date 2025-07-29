'use client'

import { Button, Card, CardBody } from '@nextui-org/react'

interface GenericErrorStateProps {
  error: string
  onRetry?: () => void
  title?: string
}

export default function GenericErrorState({
  error,
  onRetry,
  title = 'Something went wrong'
}: GenericErrorStateProps) {
  return (
    <div className="flex justify-center items-center p-8">
      <Card className="max-w-md">
        <CardBody className="text-center">
          <h3 className="text-red-400 text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          {onRetry && (
            <Button 
              color="primary"
              onClick={onRetry}
              variant="flat"
            >
              Try Again
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  )
}