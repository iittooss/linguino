import { IconChefHat } from '@tabler/icons-react'
import type { Ingredient } from '../data/types'
import { useSortedAccompaniments } from '../hooks/useIngredients'
import { useRecipeStore } from '../store/useRecipeStore'
import { IngredientCard } from './IngredientCard'
import { IngredientColumnShell } from './IngredientColumnShell'

export const AccompanimentColumn = () => {
  const selectedAccompaniments = useRecipeStore(s => s.selectedAccompaniments)
  const toggleAccompaniment = useRecipeStore(s => s.toggleAccompaniment)

  const selectedIds = selectedAccompaniments.map(a => a.id)
  const accompaniments = useSortedAccompaniments(selectedIds)

  return (
    <IngredientColumnShell color="indigo" icon={<IconChefHat size={20} />} title="Accompagnements">
      {accompaniments.map((a: Ingredient) => (
        <IngredientCard
          ingredient={a}
          isSelected={selectedIds.includes(a.id)}
          key={a.id}
          onClick={() => toggleAccompaniment(a)}
        />
      ))}
    </IngredientColumnShell>
  )
}
