import { Button, Group, SimpleGrid } from '@mantine/core'
import { IconPlus, IconRotateClockwise2 } from '@tabler/icons-react'
import { useBatchRecipeStore } from '../../store/useBatchRecipeStore'
import { useFilterStore } from '../../store/useFilterStore'
import { isProteinTypeAllowed, isSeasonAllowed } from '../../utils/ingredientUtils'
import { BatchRecipeCard } from './BatchTableCard'
import NoRecipe from './NoRecipe'

export const BatchRecipe = () => {
  const { batchRecipes, fixBatchColumn, addBatchRecipe } = useBatchRecipeStore()
  const { proteinFilter, seasonFilter } = useFilterStore()

  if (batchRecipes.length === 0) {
    return <NoRecipe />
  }

  const hasInvalidProtein = batchRecipes.some(m => !isProteinTypeAllowed(proteinFilter, m.protein.type))
  const hasInvalidVegetable = batchRecipes.some(m => !isSeasonAllowed(seasonFilter, m.vegetable.seasons))

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Group>
          {hasInvalidProtein && (
            <Button
              color="orange"
              leftSection={<IconRotateClockwise2 size={18} />}
              onClick={() => fixBatchColumn('protein')}
              variant="light"
            >
              Corriger les protéines
            </Button>
          )}

          {hasInvalidVegetable && (
            <Button
              color="orange"
              leftSection={<IconRotateClockwise2 size={18} />}
              onClick={() => fixBatchColumn('vegetable')}
              variant="light"
            >
              Corriger les légumes
            </Button>
          )}
          <Button color="blue" leftSection={<IconPlus size={18} />} onClick={addBatchRecipe} variant="light">
            Ajouter un repas
          </Button>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3, sm: 2, xs: 2 }}>
        {batchRecipes.map(meal => (
          <BatchRecipeCard key={meal.id} meal={meal} />
        ))}
      </SimpleGrid>
    </>
  )
}
