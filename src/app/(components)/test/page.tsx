// src/components/TestNextUI.tsx
import { Button, Card, CardBody } from '@nextui-org/react'

export default function TestNextUI() {
  return (
    <div className="p-4">
      <Card className="max-w-[400px]">
        <CardBody>
          <h1 className="text-2xl font-bold mb-4">NextUI Test</h1>
          <Button color="primary" className="mb-2">
            Primary Button
          </Button>
          <Button color="secondary" variant="flat">
            Secondary Button
          </Button>
          <p className="mt-4 text-small text-default-500">
            If you can see styled buttons and this card, NextUI is working!
          </p>
        </CardBody>
      </Card>
    </div>
  )
}