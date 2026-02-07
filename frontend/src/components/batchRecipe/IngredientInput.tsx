import { ActionIcon, Group, Select, Tooltip } from '@mantine/core'
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react'
import type { Ingredient, IngredientCategory } from '../../data/types'
import { useFilterStore } from '../../store/useFilterStore'
import { getFilteredIngredients } from '../../utils/ingredientUtils'

interface BatchIngredientCellProps {
  ingredient: Ingredient
  category: IngredientCategory
  isValid: boolean
  invalidLabel: string
  onUpdate: (val: Ingredient) => void
  onReroll: () => void
}

export const IngredientInput = ({
  ingredient,
  category,
  isValid,
  invalidLabel,
  onUpdate,
  onReroll,
}: BatchIngredientCellProps) => {
  const { proteinFilter, seasonFilter } = useFilterStore()
  const availableIngredients = getFilteredIngredients(category, proteinFilter, seasonFilter)

  return (
    <Group gap="xs" wrap="nowrap">
      {!isValid && (
        <Tooltip color="orange" label={invalidLabel} position="top" withArrow>
          <IconAlertTriangle color="orange" size={16} style={{ flexShrink: 0 }} />
        </Tooltip>
      )}
      <Select
        data={availableIngredients.map(i => ({ label: i.name, value: i.id }))}
        onChange={val => {
          const found = availableIngredients.find(i => i.id === val)
          if (found) onUpdate(found)
        }}
        searchable
        size="xs"
        styles={{
          input: {
            color: isValid ? 'inherit' : 'var(--mantine-color-orange-7)',
            fontWeight: 500,
            padding: 0,
          },
          root: { flex: 1 },
        }}
        value={ingredient.id}
        variant="unstyled"
      />
      <ActionIcon color="gray" onClick={onReroll} size="sm" variant="subtle">
        <IconRefresh size={14} />
      </ActionIcon>
    </Group>
  )
}
