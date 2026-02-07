import { IconGrain } from '@tabler/icons-react'
import type { Ingredient } from '../data/types'
import { useSortedStarches } from '../hooks/useIngredients'
import { useSingleRecipeStore } from '../store/useSingleRecipeStore'
import { IngredientCard } from './IngredientCard'
import { IngredientColumnShell } from './IngredientColumnShell'

export const StarchColumn = () => {
  const selectedStarch = useSingleRecipeStore(s => s.selectedRecipe.starch)
  const setSelectedStarch = useSingleRecipeStore(s => s.setSelectedStarch)

  const starches = useSortedStarches(selectedStarch?.id)

  return (
    <IngredientColumnShell color="orange" icon={<IconGrain size={20} />} title="Féculents">
      {starches.map((s: Ingredient) => (
        <IngredientCard
          ingredient={s}
          isSelected={selectedStarch?.id === s.id}
          key={s.id}
          onClick={() => setSelectedStarch(s)}
        />
      ))}
    </IngredientColumnShell>
  )
}
