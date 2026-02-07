import { Card, Group, Stack, Text } from '@mantine/core'
import type { ReactNode } from 'react'
import type { Ingredient } from '../data/types'

interface IngredientCardProps {
  ingredient: Ingredient
  isSelected?: boolean
  onClick?: () => void
  children?: ReactNode
}

export const IngredientCard = ({ ingredient, isSelected, onClick, children }: IngredientCardProps) => {
  return (
    <Card
      className={`transition-all duration-300 ${isSelected ? '' : 'hover:scale-[0.98] opacity-90 hover:opacity-100'}`}
      onClick={onClick}
      padding="sm"
      radius="lg"
      shadow={isSelected ? 'md' : 'xs'}
      style={{
        backgroundColor: isSelected ? 'var(--mantine-color-blue-0)' : 'white',
        borderColor: isSelected ? 'var(--mantine-color-blue-5)' : 'var(--mantine-color-gray-2)',
        borderWidth: isSelected ? '2px' : '1px',
        cursor: onClick ? 'pointer' : 'default',
      }}
      withBorder
    >
      <Stack align="center" gap="xs" h="100%" justify="center">
        <Text
          className={`transition-colors duration-300 ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}
          fw={isSelected ? 800 : 600}
          size="sm"
          ta="center"
        >
          {ingredient.name}
        </Text>

        {children && (
          <Group gap={6} justify="center" wrap="wrap">
            {children}
          </Group>
        )}
      </Stack>
    </Card>
  )
}
