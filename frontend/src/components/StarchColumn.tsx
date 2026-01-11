import { Grid } from '@mantine/core';
import { type Ingredient } from '../data/ingredients';
import { IngredientCard } from './IngredientCard';
import { IngredientColumn } from './IngredientColumn';
import { useRecipeStore } from '../store/useRecipeStore';
import { useSortedStarches } from '../hooks/useIngredients';

export const StarchColumn = () => {
    const selectedStarch = useRecipeStore((s) => s.selectedRecipe.starch);
    const setSelectedStarch = useRecipeStore((s) => s.setSelectedStarch);

    const sortedStarches = useSortedStarches(selectedStarch?.id);

    return (
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
            <IngredientColumn title="Féculents">
                {sortedStarches.map((s: Ingredient) => (
                    <IngredientCard
                        key={s.id}
                        ingredient={s}
                        isSelected={selectedStarch?.id === s.id}
                        onClick={() => setSelectedStarch(s)}
                    />
                ))}
            </IngredientColumn>
        </Grid.Col>
    );
};
