import { Paper, Stack, Group, Title, Divider, Text, Badge, CloseButton } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';
import { type Ingredient } from '../data/ingredients';
import { useRecipeStore } from '../store/useRecipeStore';

export const RecipeDisplay = () => {
    const { protein, vegetable, starch } = useRecipeStore((s) => s.selectedRecipe);
    const selectedAccompaniments = useRecipeStore((s) => s.selectedAccompaniments);
    const toggleAccompaniment = useRecipeStore((s) => s.toggleAccompaniment);

    if (!protein && selectedAccompaniments.length === 0) {
        return null;
    }

    return (
        <Paper withBorder p="xl" radius="lg" mb="xl" bg="blue.0" className="border-blue-200 shadow-md">
            <Stack align="center">
                <Group>
                    <IconChefHat size={32} color="var(--mantine-color-blue-6)" />
                    <Title order={2} c="blue.8">Menu Inspiré</Title>
                </Group>
                <Divider w="100%" label="La Recette" labelPosition="center" />

                {protein && (
                    <Text size="xl" fw={800} className="text-center">
                        {protein.name} accompagné de {vegetable?.name} et {starch?.name}
                    </Text>
                )}

                {selectedAccompaniments.length > 0 && (
                    <Group justify="center" gap="xs">
                        <Text fw={600} size="sm" c="dimmed">Avec :</Text>
                        {selectedAccompaniments.map((acc: Ingredient) => (
                            <Badge
                                key={acc.id}
                                variant="light"
                                color="blue"
                                size="lg"
                                pr={3}
                                rightSection={
                                    <CloseButton
                                        size="xs"
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => toggleAccompaniment(acc)}
                                        variant="transparent"
                                        color="blue"
                                    />
                                }
                            >
                                {acc.name}
                            </Badge>
                        ))}
                    </Group>
                )}
            </Stack>
        </Paper>
    );
};
