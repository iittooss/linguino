import { Grid } from '@mantine/core';
import { type Ingredient } from '../data/ingredients';
import { IngredientCard } from './IngredientCard';
import { IngredientColumn } from './IngredientColumn';
import { useRecipeStore } from '../store/useRecipeStore';
import { useSortedAccompaniments } from '../hooks/useIngredients';

export const AccompanimentColumn = () => {
    const selectedAccompaniments = useRecipeStore((s) => s.selectedAccompaniments);
    const toggleAccompaniment = useRecipeStore((s) => s.toggleAccompaniment);

    const sortedAccompaniments = useSortedAccompaniments(selectedAccompaniments.map((a: Ingredient) => a.id));

    return (
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
            <IngredientColumn title="Accompagnements">
                {sortedAccompaniments.map((a: Ingredient) => (
                    <IngredientCard
                        key={a.id}
                        ingredient={a}
                        isSelected={selectedAccompaniments.some((acc: Ingredient) => acc.id === a.id)}
                        onClick={() => toggleAccompaniment(a)}
                    />
                ))}
            </IngredientColumn>
        </Grid.Col>
    );
};
