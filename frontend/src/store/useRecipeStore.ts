import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  IngredientType, 
  Season, 
  IngredientCategory,
  type Ingredient,
  type GeneratedMeal 
} from '../data/types';
import { getRandomIngredient, isProteinTypeAllowed, isSeasonAllowed } from '../utils/ingredientUtils';

interface RecipeState {
  proteinFilter: IngredientType;
  seasonFilter: Season;
  selectedRecipe: {
    protein: Ingredient | null;
    vegetable: Ingredient | null;
    starch: Ingredient | null;
  };
  selectedAccompaniments: Ingredient[];
  batchRecipes: GeneratedMeal[];
  
  // Actions
  setProteinFilter: (filter: IngredientType) => void;
  setSeasonFilter: (season: Season) => void;
  setSelectedProtein: (p: Ingredient) => void;
  setSelectedVegetable: (v: Ingredient) => void;
  setSelectedStarch: (s: Ingredient) => void;
  toggleAccompaniment: (acc: Ingredient) => void;
  generateRecipe: () => void;
  generateBatchRecipes: (count: number) => void;
  addBatchRecipe: () => void;
  removeBatchRecipe: (id: string) => void;
  updateBatchRecipe: (id: string, updates: Partial<GeneratedMeal>) => void;
  rerollBatchRow: (id: string) => void;
  rerollBatchColumn: (id: string, column: 'protein' | 'vegetable' | 'starch') => void;
  fixBatchColumn: (column: 'protein' | 'vegetable') => void;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      proteinFilter: IngredientType.ANY,
      seasonFilter: Season.TOUTES,
      selectedRecipe: {
        protein: null,
        vegetable: null,
        starch: null,
      },
      selectedAccompaniments: [],
      batchRecipes: [],

      setProteinFilter: (proteinFilter) => set({ proteinFilter }),
      setSeasonFilter: (seasonFilter) => set({ seasonFilter }),
      
      setSelectedProtein: (protein) => set((state) => ({ 
        selectedRecipe: { ...state.selectedRecipe, protein } 
      })),
      
      setSelectedVegetable: (vegetable) => set((state) => ({ 
        selectedRecipe: { ...state.selectedRecipe, vegetable } 
      })),
      
      setSelectedStarch: (starch) => set((state) => ({ 
        selectedRecipe: { ...state.selectedRecipe, starch } 
      })),
      
      toggleAccompaniment: (acc) => set((state) => {
        const isSelected = state.selectedAccompaniments.some(a => a.id === acc.id);
        return {
          selectedAccompaniments: isSelected 
            ? state.selectedAccompaniments.filter(a => a.id !== acc.id)
            : [...state.selectedAccompaniments, acc]
        };
      }),

      generateRecipe: () => {
        const { proteinFilter, seasonFilter } = get();
        set({ 
          selectedRecipe: { 
            protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
            vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
            starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter)
          } 
        });
      },

      generateBatchRecipes: (count) => {
        const { proteinFilter, seasonFilter } = get();
        const newMeals: GeneratedMeal[] = Array.from({ length: count }).map(() => ({
          id: Math.random().toString(36).substr(2, 9),
          protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
          starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
          accompaniments: [],
        }));
        set(state => ({ batchRecipes: [...state.batchRecipes, ...newMeals] }));
      },

      addBatchRecipe: () => {
        const { proteinFilter, seasonFilter } = get();
        const newMeal: GeneratedMeal = {
          id: Math.random().toString(36).substr(2, 9),
          protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
          vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
          starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
          accompaniments: [],
        };
        set(state => ({ batchRecipes: [...state.batchRecipes, newMeal] }));
      },

      removeBatchRecipe: (id) => set(state => ({
        batchRecipes: state.batchRecipes.filter(m => m.id !== id)
      })),

      updateBatchRecipe: (id, updates) => set(state => ({
        batchRecipes: state.batchRecipes.map(m => m.id === id ? { ...m, ...updates } : m)
      })),

      rerollBatchRow: (id) => {
        const { proteinFilter, seasonFilter } = get();
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => m.id === id ? {
            ...m,
            protein: getRandomIngredient(IngredientCategory.PROTEIN, proteinFilter, seasonFilter),
            vegetable: getRandomIngredient(IngredientCategory.VEGETABLE, proteinFilter, seasonFilter),
            starch: getRandomIngredient(IngredientCategory.STARCH, proteinFilter, seasonFilter),
          } : m)
        }));
      },

      rerollBatchColumn: (id, column) => {
        const { proteinFilter, seasonFilter } = get();
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => {
            if (m.id !== id) return m;
            const category = column === 'protein' ? IngredientCategory.PROTEIN : 
                           column === 'vegetable' ? IngredientCategory.VEGETABLE : 
                           IngredientCategory.STARCH;
            return { ...m, [column]: getRandomIngredient(category, proteinFilter, seasonFilter) };
          })
        }));
      },
      
      fixBatchColumn: (column) => {
        const { proteinFilter, seasonFilter } = get();
        set(state => ({
          batchRecipes: state.batchRecipes.map(m => {
            const isValid = column === 'protein' ? isProteinTypeAllowed(proteinFilter, m.protein.type) : 
                                                 isSeasonAllowed(seasonFilter, m.vegetable.seasons);
            if (isValid) return m;
            const category = column === 'protein' ? IngredientCategory.PROTEIN : IngredientCategory.VEGETABLE;
            return { ...m, [column]: getRandomIngredient(category, proteinFilter, seasonFilter) };
          })
        }));
      }
    }),
    {
      name: 'linguino-storage',
      partialize: (state) => ({ batchRecipes: state.batchRecipes }),
    }
  )
);
