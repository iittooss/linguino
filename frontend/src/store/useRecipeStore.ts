import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  EIngredientType,
  ESeason,
  type GeneratedMeal,
  type Ingredient,
  IngredientCategory,
  type IngredientType,
  type Season,
} from '../data/types'
import { getRandomIngredient, isProteinTypeAllowed, isSeasonAllowed } from '../utils/ingredientUtils'

interface RecipeState {
  proteinFilter: IngredientType
  seasonFilter: Season
  selectedRecipe: {
    protein: Ingredient | null
    vegetable: Ingredient | null
    starch: Ingredient | null
  }
  selectedAccompaniments: Ingredient[]
  batchRecipes: GeneratedMeal[]

  // Actions
  setProteinFilter: (filter: IngredientType) => void
  setSeasonFilter: (season: Season) => void
  setSelectedProtein: (p: Ingredient) => void
  setSelectedVegetable: (v: Ingredient) => void
  setSelectedStarch: (s: Ingredient) => void
  toggleAccompaniment: (acc: Ingredient) => void
  generateRecipe: () => void
  generateBatchRecipes: (count: number) => void
  addBatchRecipe: () => void
  removeBatchRecipe: (id: string) => void
  updateBatchRecipe: (id: string, updates: Partial<GeneratedMeal>) => void
  rerollBatchRow: (id: string) => void
  rerollBatchColumn: (id: string, column: 'protein' | 'vegetable' | 'starch') => void
  fixBatchColumn: (column: 'protein' | 'vegetable') => void
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      addBatchRecipe: () => {
        const { proteinFilter, seasonFilter } = get()
        const newMeal: GeneratedMeal = {
          accompaniments: [],
          id: Math.random().toString(36).substr(2, 9),
          protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
        }
        set(state => ({ batchRecipes: [...state.batchRecipes, newMeal] }))
      },
      batchRecipes: [],

      fixBatchColumn: column => {
        const { proteinFilter, seasonFilter } = get()
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
        const { proteinFilter, seasonFilter } = get()
        const newMeals: GeneratedMeal[] = Array.from({ length: count }).map(() => ({
          accompaniments: [],
          id: Math.random().toString(36).substr(2, 9),
          protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
        }))
        set(state => ({ batchRecipes: [...state.batchRecipes, ...newMeals] }))
      },

      generateRecipe: () => {
        const { proteinFilter, seasonFilter } = get()
        set({
          selectedRecipe: {
            protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
            starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
            vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
          },
        })
      },
      proteinFilter: EIngredientType.ANY,

      removeBatchRecipe: id =>
        set(state => ({
          batchRecipes: state.batchRecipes.filter(m => m.id !== id),
        })),

      rerollBatchColumn: (id, column) => {
        const { proteinFilter, seasonFilter } = get()
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
        const { proteinFilter, seasonFilter } = get()
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
      seasonFilter: ESeason.ALL,
      selectedAccompaniments: [],
      selectedRecipe: {
        protein: null,
        starch: null,
        vegetable: null,
      },

      setProteinFilter: proteinFilter => set({ proteinFilter }),
      setSeasonFilter: seasonFilter => set({ seasonFilter }),

      setSelectedProtein: protein =>
        set(state => ({
          selectedRecipe: { ...state.selectedRecipe, protein },
        })),

      setSelectedStarch: starch =>
        set(state => ({
          selectedRecipe: { ...state.selectedRecipe, starch },
        })),

      setSelectedVegetable: vegetable =>
        set(state => ({
          selectedRecipe: { ...state.selectedRecipe, vegetable },
        })),

      toggleAccompaniment: acc =>
        set(state => {
          const isSelected = state.selectedAccompaniments.some(a => a.id === acc.id)
          return {
            selectedAccompaniments: isSelected
              ? state.selectedAccompaniments.filter(a => a.id !== acc.id)
              : [...state.selectedAccompaniments, acc],
          }
        }),

      updateBatchRecipe: (id, updates) =>
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => (m.id === id ? { ...m, ...updates } : m)),
        })),
    }),
    {
      name: 'linguino-storage',
      partialize: state => ({ batchRecipes: state.batchRecipes }),
    },
  ),
)
