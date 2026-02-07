import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IngredientCategory, type GeneratedMeal } from '../data/types'
import { getRandomIngredient, isProteinTypeAllowed, isSeasonAllowed } from '../utils/ingredientUtils'
import { useFilterStore } from './useFilterStore'

interface BatchRecipeState {
  batchRecipes: GeneratedMeal[]

  generateBatchRecipes: (count: number) => void
  addBatchRecipe: () => void
  removeBatchRecipe: (id: string) => void
  updateBatchRecipe: (id: string, updates: Partial<GeneratedMeal>) => void
  rerollBatchRow: (id: string) => void
  rerollBatchColumn: (id: string, column: 'protein' | 'vegetable' | 'starch') => void
  fixBatchColumn: (column: 'protein' | 'vegetable') => void
}

export const useBatchRecipeStore = create<BatchRecipeState>()(
  persist(
    set => ({
      batchRecipes: [],

      addBatchRecipe: () => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        const newMeal: GeneratedMeal = {
          accompaniments: [],
          id: Math.random().toString(36).substr(2, 9),
          protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
        }
        set(state => ({ batchRecipes: [...state.batchRecipes, newMeal] }))
      },

      fixBatchColumn: column => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => {
            const isValid =
              column === 'protein'
                ? isProteinTypeAllowed(proteinFilter, m.protein.type)
                : isSeasonAllowed(seasonFilter, m.vegetable.seasons)
            if (isValid) return m
            const category = column === 'protein' ? IngredientCategory.PROTEIN : IngredientCategory.VEGETABLE
            return { ...m, [column]: getRandomIngredient(category, proteinFilter, seasonFilter) }
          }),
        }))
      },

      generateBatchRecipes: count => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        const newMeals: GeneratedMeal[] = Array.from({ length: count }).map(() => ({
          accompaniments: [],
          id: Math.random().toString(36).substr(2, 9),
          protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
        }))
        set(state => ({ batchRecipes: [...state.batchRecipes, ...newMeals] }))
      },

      removeBatchRecipe: id =>
        set(state => ({
          batchRecipes: state.batchRecipes.filter(m => m.id !== id),
        })),

      rerollBatchColumn: (id, column) => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => {
            if (m.id !== id) return m
            const category =
              column === 'protein'
                ? IngredientCategory.PROTEIN
                : column === 'vegetable'
                  ? IngredientCategory.VEGETABLE
                  : IngredientCategory.STARCH
            return { ...m, [column]: getRandomIngredient(category, proteinFilter, seasonFilter) }
          }),
        }))
      },

      rerollBatchRow: id => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        set(state => ({
          batchRecipes: state.batchRecipes.map(m =>
            m.id === id
              ? {
                  ...m,
                  protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
                  starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
                  vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
                }
              : m,
          ),
        }))
      },

      updateBatchRecipe: (id, updates) =>
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => (m.id === id ? { ...m, ...updates } : m)),
        })),
    }),
    {
      name: 'linguino-batch-storage',
      partialize: state => ({ batchRecipes: state.batchRecipes }),
    },
  ),
)
