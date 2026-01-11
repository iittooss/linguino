import { useState } from 'react';
import {
    Container,
    Grid,
    Stack,
    Title,
    Button,
    Text,
    NumberInput,
    Group,
    Paper,
    Divider
} from '@mantine/core';
import { IconRefresh, IconListNumbers } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';
import { ProteinColumn } from './ProteinColumn';
import { VegetableColumn } from './VegetableColumn';
import { StarchColumn } from './StarchColumn';
import { AccompanimentColumn } from './AccompanimentColumn';
import { RecipeDisplay } from './RecipeDisplay';
import { BatchRecipeTable } from './BatchRecipeTable';

export const RecipeGenerator = () => {
    const generateRecipe = useRecipeStore((s) => s.generateRecipe);
    const generateBatch = useRecipeStore((s) => s.generateBatchRecipes);
    const [batchCount, setBatchCount] = useState<number>(7);

    return (
        <Container size="xl" py="xl" fluid>
            <Stack align="center" mb="xl">
                <Title order={1} className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                    Générateur de Recettes
                </Title>
                <Text c="dimmed" size="lg">Composez votre repas idéal avec vos ingrédients préférés</Text>
            </Stack>

            <Paper withBorder p="xl" radius="lg" mb="xl" shadow="sm">
                <Group justify="center" gap="xl" wrap="wrap">
                    <Button
                        size="xl"
                        leftSection={<IconRefresh size={28} />}
                        variant="filled"
                        color="blue"
                        onClick={generateRecipe}
                        className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        radius="md"
                    >
                        Générer une idée
                    </Button>

                    <Divider orientation="vertical" visibleFrom="sm" />

                    <Group gap="xs" align="flex-end">
                        <NumberInput
                            label="Nombre de repas"
                            value={batchCount}
                            onChange={(val) => setBatchCount(Number(val))}
                            min={1}
                            max={21}
                            step={1}
                            w={120}
                            size="md"
                        />
                        <Button
                            size="xl"
                            leftSection={<IconListNumbers size={28} />}
                            variant="outline"
                            color="teal"
                            onClick={() => generateBatch(batchCount)}
                            className="shadow-sm hover:shadow-md transition-all duration-300"
                            radius="md"
                        >
                            Générer par lot
                        </Button>
                    </Group>
                </Group>
            </Paper>

            <RecipeDisplay />

            <Grid gutter="md" mb="xl">
                <ProteinColumn />
                <VegetableColumn />
                <StarchColumn />
                <AccompanimentColumn />
            </Grid>

            <BatchRecipeTable />
        </Container>
    );
};
