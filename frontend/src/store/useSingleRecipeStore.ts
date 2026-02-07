import { create } from 'zustand'
import { IngredientCategory, type Ingredient } from '../data/types'
import { getRandomIngredient } from '../utils/ingredientUtils'
import { useFilterStore } from './useFilterStore'

interface SingleRecipeState {
  selectedRecipe: {
    protein: Ingredient | null
    vegetable: Ingredient | null
    starch: Ingredient | null
  }
  selectedAccompaniments: Ingredient[]

  setSelectedProtein: (p: Ingredient) => void
  setSelectedVegetable: (v: Ingredient) => void
  setSelectedStarch: (s: Ingredient) => void
  toggleAccompaniment: (acc: Ingredient) => void
  generateRecipe: () => void
}

export const useSingleRecipeStore = create<SingleRecipeState>()(set => ({
  selectedRecipe: {
    protein: null,
    starch: null,
    vegetable: null,
  },
  selectedAccompaniments: [],

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

  generateRecipe: () => {
    const { proteinFilter, seasonFilter } = useFilterStore.getState()
    set({
      selectedRecipe: {
        protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
        starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
        vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
      },
    })
  },
}))
