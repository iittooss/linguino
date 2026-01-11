import { Grid, SegmentedControl, Group } from '@mantine/core';
import { Season, type Ingredient } from '../data/ingredients';
import { IngredientCard } from './IngredientCard';
import { IngredientColumn } from './IngredientColumn';
import { useRecipeStore } from '../store/useRecipeStore';
import { useFilteredVegetables } from '../hooks/useIngredients';
import { SeasonIconBadge } from './SeasonIconBadge';

export const VegetableColumn = () => {
    const filter = useRecipeStore((s) => s.seasonFilter);
    const setFilter = useRecipeStore((s) => s.setSeasonFilter);
    const selectedVegetable = useRecipeStore((s) => s.selectedRecipe.vegetable);
    const setSelectedVegetable = useRecipeStore((s) => s.setSelectedVegetable);

    const filteredVegetables = useFilteredVegetables(filter, selectedVegetable?.id);

    return (
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
            <IngredientColumn
                title="Légumes"
                filterComponent={
                    <SegmentedControl
                        fullWidth
                        size="xs"
                        value={filter}
                        onChange={(value) => setFilter(value as Season)}
                        data={[
                            { label: 'Toutes', value: Season.TOUTES },
                            { label: 'Prit.', value: Season.PRINTEMPS },
                            { label: 'Été', value: Season.ETE },
                            { label: 'Aut.', value: Season.AUTOMNE },
                            { label: 'Hiv.', value: Season.HIVER },
                        ]}
                    />
                }
            >
                {filteredVegetables.map((v: Ingredient) => (
                    <IngredientCard
                        key={v.id}
                        ingredient={v}
                        isSelected={selectedVegetable?.id === v.id}
                        onClick={() => setSelectedVegetable(v)}
                    >
                        {v.seasons && (
                            <Group gap={4}>
                                {v.seasons.map((s: Season) => (
                                    <SeasonIconBadge
                                        key={s}
                                        season={s}
                                        activeSeason={filter}
                                        onClick={setFilter}
                                    />
                                ))}
                            </Group>
                        )}
                    </IngredientCard>
                ))}
            </IngredientColumn>
        </Grid.Col>
    );
};
