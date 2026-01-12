import { IconGrain } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';
import { useSortedStarches } from '../hooks/useIngredients';
import { IngredientCard } from './IngredientCard';
import { IngredientColumnShell } from './IngredientColumnShell';
import type { Ingredient } from '../data/types';

export const StarchColumn = () => {
    const selectedStarch = useRecipeStore((s) => s.selectedRecipe.starch);
    const setSelectedStarch = useRecipeStore((s) => s.setSelectedStarch);

    const starches = useSortedStarches(selectedStarch?.id);

    return (
        <IngredientColumnShell
            title="Féculents"
            icon={<IconGrain size={20} />}
            color="orange"
        >
            {starches.map((s: Ingredient) => (
                <IngredientCard
                    key={s.id}
                    ingredient={s}
                    isSelected={selectedStarch?.id === s.id}
                    onClick={() => setSelectedStarch(s)}
                />
            ))}
        </IngredientColumnShell>
    );
};
