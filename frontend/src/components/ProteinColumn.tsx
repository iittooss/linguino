import { Grid, SegmentedControl } from '@mantine/core';
import { IngredientType, type Ingredient } from '../data/ingredients';
import { IngredientCard } from './IngredientCard';
import { IngredientColumn } from './IngredientColumn';
import { useRecipeStore } from '../store/useRecipeStore';
import { useFilteredProteins } from '../hooks/useIngredients';
import { ProteinIconBadge } from './ProteinIconBadge';

export const ProteinColumn = () => {
    const filter = useRecipeStore((s) => s.proteinFilter);
    const setFilter = useRecipeStore((s) => s.setProteinFilter);
    const selectedProtein = useRecipeStore((s) => s.selectedRecipe.protein);
    const setSelectedProtein = useRecipeStore((s) => s.setSelectedProtein);

    const filteredProteins = useFilteredProteins(filter, selectedProtein?.id);

    return (
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
            <IngredientColumn
                title="Protéines"
                filterComponent={
                    <SegmentedControl
                        fullWidth
                        size="xs"
                        value={filter}
                        onChange={(value) => setFilter(value as IngredientType)}
                        data={[
                            { label: 'Tous', value: IngredientType.ANY },
                            { label: 'Flexi', value: IngredientType.FLEXI },
                            { label: 'Végé', value: IngredientType.VEGE },
                            { label: 'Végan', value: IngredientType.VEGAN },
                        ]}
                    />
                }
            >
                {filteredProteins.map((p: Ingredient) => (
                    <IngredientCard
                        key={p.id}
                        ingredient={p}
                        isSelected={selectedProtein?.id === p.id}
                        onClick={() => setSelectedProtein(p)}
                    >
                        {p.type && (
                            <ProteinIconBadge
                                type={p.type}
                                activeType={filter}
                                onClick={setFilter}
                            />
                        )}
                    </IngredientCard>
                ))}
            </IngredientColumn>
        </Grid.Col>
    );
};
