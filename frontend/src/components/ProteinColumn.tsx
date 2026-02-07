import { IconMeat } from '@tabler/icons-react'
import type { Ingredient } from '../data/types'
import { useFilteredProteins } from '../hooks/useIngredients'
import { useFilterStore } from '../store/useFilterStore'
import { useSingleRecipeStore } from '../store/useSingleRecipeStore'
import { IngredientCard } from './IngredientCard'
import { IngredientColumnShell } from './IngredientColumnShell'
import { ProteinIconBadge } from './ProteinIconBadge'

export const ProteinColumn = () => {
  const proteinFilter = useFilterStore(s => s.proteinFilter)
  const selectedProtein = useSingleRecipeStore(s => s.selectedRecipe.protein)
  const setSelectedProtein = useSingleRecipeStore(s => s.setSelectedProtein)

  const proteins = useFilteredProteins(proteinFilter, selectedProtein?.id)

  return (
    <IngredientColumnShell color="red" icon={<IconMeat size={20} />} title="Protéines">
      {proteins.map((p: Ingredient) => (
        <IngredientCard
          ingredient={p}
          isSelected={selectedProtein?.id === p.id}
          key={p.id}
          onClick={() => setSelectedProtein(p)}
        >
          {p.type && <ProteinIconBadge size={14} type={p.type} />}
        </IngredientCard>
      ))}
    </IngredientColumnShell>
  )
}
