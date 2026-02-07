import { Card } from '@mantine/core'
import type { ReactNode } from 'react'

interface IBaseCardProps {
  children?: ReactNode
}

const BaseCard: React.FC<IBaseCardProps> = ({ children }) => {
  return (
    <Card mb="md" radius="md" shadow="sm" withBorder>
      {children}
    </Card>
  )
}

export default BaseCard
