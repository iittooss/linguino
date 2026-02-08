import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EIngredientCategory, type GeneratedMeal } from '../data/types'
import { getRandomIngredient, isProteinTypeAllowed, isSeasonAllowed } from '../utils/ingredientUtils'
import { useFilterStore } from './useFilterStore'

interface BatchRecipeState {
  batchRecipes: GeneratedMeal[]
  defaultPeopleCount: number

  generateBatchRecipes: (count: number) => void
  addBatchRecipe: () => void
  removeBatchRecipe: (id: string) => void
  updateBatchRecipe: (id: string, updates: Partial<GeneratedMeal>) => void
  rerollBatchRow: (id: string) => void
  rerollBatchColumn: (id: string, column: 'protein' | 'vegetable' | 'starch') => void
  fixBatchColumn: (column: 'protein' | 'vegetable') => void
  setDefaultPeopleCount: (count: number) => void
  updateMealPeopleCount: (id: string, count: number) => void
  selectedMealForInfo: GeneratedMeal | null
  openNutritionalModal: (meal: GeneratedMeal) => void
  closeNutritionalModal: () => void
}

export const useBatchRecipeStore = create<BatchRecipeState>()(
  persist(
    (set, get) => ({
      addBatchRecipe: () => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        const { defaultPeopleCount } = get()
        const newMeal: GeneratedMeal = {
          accompaniments: [],
          customPeopleCount: false,
          id: Math.random().toString(36).substr(2, 9),
          peopleCount: defaultPeopleCount,
          protein: getRandomIngredient(EIngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          starch: getRandomIngredient(EIngredientCategory.STARCH, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(EIngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
        }
        set(state => ({ batchRecipes: [...state.batchRecipes, newMeal] }))
      },
      batchRecipes: [],
      defaultPeopleCount: 2,

      fixBatchColumn: column => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => {
            const isValid =
              column === 'protein'
                ? isProteinTypeAllowed(proteinFilter, m.protein.type)
                : isSeasonAllowed(seasonFilter, m.vegetable.seasons)
            if (isValid) return m
            const category = column === 'protein' ? EIngredientCategory.PROTEIN : EIngredientCategory.VEGETABLE
            return { ...m, [column]: getRandomIngredient(category, proteinFilter, seasonFilter) }
          }),
        }))
      },

      generateBatchRecipes: count => {
        const { proteinFilter, seasonFilter } = useFilterStore.getState()
        const { defaultPeopleCount } = get()
        const newMeals: GeneratedMeal[] = Array.from({ length: count }).map(() => ({
          accompaniments: [],
          customPeopleCount: false,
          id: Math.random().toString(36).substr(2, 9),
          peopleCount: defaultPeopleCount,
          protein: getRandomIngredient(EIngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          starch: getRandomIngredient(EIngredientCategory.STARCH, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(EIngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
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
                ? EIngredientCategory.PROTEIN
                : column === 'vegetable'
                  ? EIngredientCategory.VEGETABLE
                  : EIngredientCategory.STARCH
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
                  protein: getRandomIngredient(EIngredientCategory.PROTEIN, proteinFilter, seasonFilter),
                  starch: getRandomIngredient(EIngredientCategory.STARCH, proteinFilter, seasonFilter),
                  vegetable: getRandomIngredient(EIngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
                  // Keep existing peopleCount if custom, otherwise use default?
                  // Logic check: usually reroll shouldn't reset people count unless specified.
                  // Let's keep existing peopleCount and custom flag.
                }
              : m,
          ),
        }))
      },

      setDefaultPeopleCount: count =>
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => (m.customPeopleCount ? m : { ...m, peopleCount: count })),
          defaultPeopleCount: count,
        })),

      updateBatchRecipe: (id, updates) =>
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => (m.id === id ? { ...m, ...updates } : m)),
        })),

      updateMealPeopleCount: (id, count) =>
        set(state => ({
          batchRecipes: state.batchRecipes.map(m =>
            m.id === id ? { ...m, customPeopleCount: true, peopleCount: count } : m,
          ),
        })),

      selectedMealForInfo: null,
      openNutritionalModal: meal => set({ selectedMealForInfo: meal }),
      closeNutritionalModal: () => set({ selectedMealForInfo: null }),
    }),
    {
      name: 'linguino-batch-storage',
      partialize: state => ({
        batchRecipes: state.batchRecipes,
        defaultPeopleCount: state.defaultPeopleCount,
      }),
    },
  ),
)
