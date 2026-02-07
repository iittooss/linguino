import { ActionIcon, Group, MultiSelect, Tooltip } from '@mantine/core'
import { IconRefresh, IconTrash } from '@tabler/icons-react'
import { ACCOMPANIMENTS } from '../../data/ingredients'
import { type GeneratedMeal, type Ingredient, IngredientCategory } from '../../data/types'
import { useBatchRecipeStore } from '../../store/useBatchRecipeStore'
import { useFilterStore } from '../../store/useFilterStore'
import { isProteinTypeAllowed, isSeasonAllowed } from '../../utils/ingredientUtils'
import BaseCard from '../commun/BaseCard'
import { IngredientInput } from './IngredientInput'

interface BatchRecipeCardProps {
  meal: GeneratedMeal
}

export const BatchRecipeCard = ({ meal }: BatchRecipeCardProps) => {
  const { removeBatchRecipe, rerollBatchRow, rerollBatchColumn, updateBatchRecipe } = useBatchRecipeStore()
  const { seasonFilter, proteinFilter } = useFilterStore()

  const isProteinValid = isProteinTypeAllowed(proteinFilter, meal.protein.type)
  const isVegetableValid = isSeasonAllowed(seasonFilter, meal.vegetable.seasons)

  return (
    <BaseCard>
      <IngredientInput
        category={IngredientCategory.PROTEIN}
        ingredient={meal.protein}
        invalidLabel="Non conforme au régime sélectionné"
        isValid={isProteinValid}
        onReroll={() => rerollBatchColumn(meal.id, 'protein')}
        onUpdate={(protein: Ingredient) => updateBatchRecipe(meal.id, { protein })}
      />

      <IngredientInput
        category={IngredientCategory.VEGETABLE}
        ingredient={meal.vegetable}
        invalidLabel="Hors saison"
        isValid={isVegetableValid}
        onReroll={() => rerollBatchColumn(meal.id, 'vegetable')}
        onUpdate={(vegetable: Ingredient) => updateBatchRecipe(meal.id, { vegetable })}
      />

      <IngredientInput
        category={IngredientCategory.STARCH}
        ingredient={meal.starch}
        invalidLabel=""
        isValid={true}
        onReroll={() => rerollBatchColumn(meal.id, 'starch')}
        onUpdate={(starch: Ingredient) => updateBatchRecipe(meal.id, { starch })}
      />
      <MultiSelect
        data={ACCOMPANIMENTS.map((a: Ingredient) => ({ label: a.name, value: a.id }))}
        hidePickedOptions
        onChange={newIds => {
          const selectedAccs = ACCOMPANIMENTS.filter((a: Ingredient) => newIds.includes(a.id))
          updateBatchRecipe(meal.id, { accompaniments: selectedAccs })
        }}
        placeholder="Accompagnements"
        searchable
        size="xs"
        styles={{
          input: { fontSize: '12px', padding: 0 },
          pill: { margin: '1px' },
        }}
        value={meal.accompaniments.map((a: Ingredient) => a.id)}
        variant="unstyled"
      />
      <Group gap={4} wrap="nowrap">
        <Tooltip label="Relancer tout le repas" position="top" withArrow>
          <ActionIcon color="teal" onClick={() => rerollBatchRow(meal.id)} variant="subtle">
            <IconRefresh size={18} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Supprimer" position="top" withArrow>
          <ActionIcon color="red" onClick={() => removeBatchRecipe(meal.id)} variant="subtle">
            <IconTrash size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </BaseCard>
  )
}
