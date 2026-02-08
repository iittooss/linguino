import { ActionIcon, Group, MultiSelect, Tooltip } from '@mantine/core'
import { IconRefresh, IconTrash } from '@tabler/icons-react'
import { ACCOMPANIMENTS } from '../../data/ingredients'
import { EIngredientCategory, type GeneratedMeal, type Ingredient } from '../../data/types'
import { useBatchRecipeStore } from '../../store/useBatchRecipeStore'
import { useFilterStore } from '../../store/useFilterStore'
import { isProteinTypeAllowed, isSeasonAllowed } from '../../utils/ingredientUtils'
import BaseCard from '../commun/BaseCard'
import CountInput from '../commun/NumberInput'
import { IngredientInput } from './IngredientInput'

interface BatchRecipeCardProps {
  meal: GeneratedMeal
}

export const BatchRecipeCard = ({ meal }: BatchRecipeCardProps) => {
  const { removeBatchRecipe, rerollBatchRow, rerollBatchColumn, updateBatchRecipe, updateMealPeopleCount } =
    useBatchRecipeStore()
  const { seasonFilter, proteinFilter } = useFilterStore()

  const isProteinValid = isProteinTypeAllowed(proteinFilter, meal.protein.type)
  const isVegetableValid = isSeasonAllowed(seasonFilter, meal.vegetable.seasons)

  const peopleCount = meal.peopleCount || 2

  return (
    <BaseCard>
      <IngredientInput
        category={EIngredientCategory.PROTEIN}
        ingredient={meal.protein}
        invalidLabel="Non conforme au régime sélectionné"
        isValid={isProteinValid}
        onReroll={() => rerollBatchColumn(meal.id, 'protein')}
        onUpdate={(protein: Ingredient) => updateBatchRecipe(meal.id, { protein })}
        quantity={meal.protein.quantity ? meal.protein.quantity * peopleCount : undefined}
        unit={meal.protein.unit}
      />

      <IngredientInput
        category={EIngredientCategory.VEGETABLE}
        ingredient={meal.vegetable}
        invalidLabel="Hors saison"
        isValid={isVegetableValid}
        onReroll={() => rerollBatchColumn(meal.id, 'vegetable')}
        onUpdate={(vegetable: Ingredient) => updateBatchRecipe(meal.id, { vegetable })}
        quantity={meal.vegetable.quantity ? meal.vegetable.quantity * peopleCount : undefined}
        unit={meal.vegetable.unit}
      />

      <IngredientInput
        category={EIngredientCategory.STARCH}
        ingredient={meal.starch}
        invalidLabel=""
        isValid={true}
        onReroll={() => rerollBatchColumn(meal.id, 'starch')}
        onUpdate={(starch: Ingredient) => updateBatchRecipe(meal.id, { starch })}
        quantity={meal.starch.quantity ? meal.starch.quantity * peopleCount : undefined}
        unit={meal.starch.unit}
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
        <CountInput onChange={val => updateMealPeopleCount(meal.id, Number(val))} value={peopleCount} />
        <Tooltip label="Relancer tout le repas" position="top" withArrow>
          <ActionIcon color="teal" onClick={() => rerollBatchRow(meal.id)} variant="subtle">
            <IconRefresh />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Supprimer" position="top" withArrow>
          <ActionIcon color="red" onClick={() => removeBatchRecipe(meal.id)} variant="subtle">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Group>
    </BaseCard>
  )
}
