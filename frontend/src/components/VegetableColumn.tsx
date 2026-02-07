import { IconLeaf } from '@tabler/icons-react'
import type { Ingredient } from '../data/types'
import { useFilteredVegetables } from '../hooks/useIngredients'
import { useRecipeStore } from '../store/useRecipeStore'
import { IngredientCard } from './IngredientCard'
import { IngredientColumnShell } from './IngredientColumnShell'
import { SeasonIconBadge } from './SeasonIconBadge'

export const VegetableColumn = () => {
  const seasonFilter = useRecipeStore(s => s.seasonFilter)
  const selectedVegetable = useRecipeStore(s => s.selectedRecipe.vegetable)
  const setSelectedVegetable = useRecipeStore(s => s.setSelectedVegetable)

  const vegetables = useFilteredVegetables(seasonFilter, selectedVegetable?.id)

  return (
    <IngredientColumnShell color="teal" icon={<IconLeaf size={20} />} title="Légumes">
      {vegetables.map((v: Ingredient) => (
        <IngredientCard
          ingredient={v}
          isSelected={selectedVegetable?.id === v.id}
          key={v.id}
          onClick={() => setSelectedVegetable(v)}
        >
          {v.seasons?.map(s => (
            <SeasonIconBadge key={s} season={s} size={14} />
          ))}
        </IngredientCard>
      ))}
    </IngredientColumnShell>
  )
}
