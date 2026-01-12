import { Container, Title, Stack, Button, SimpleGrid } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useRecipeStore } from '../store/useRecipeStore';
import { ProteinColumn } from '../components/ProteinColumn';
import { VegetableColumn } from '../components/VegetableColumn';
import { StarchColumn } from '../components/StarchColumn';
import { AccompanimentColumn } from '../components/AccompanimentColumn';
import { RecipeDisplay } from '../components/RecipeDisplay';
import { GlobalFilterBar } from '../components/GlobalFilterBar';

export const SingleRecipePage = () => {
    const generateRecipe = useRecipeStore((s) => s.generateRecipe);

    return (
        <Container size="xl" py="xl" fluid>
            <Stack align="center" mb="xl" gap="lg">
                <Stack align="center" gap={4}>
                    <Title order={1} className="text-4xl font-extrabold text-blue-900">
                        Générer une Recette
                    </Title>
                </Stack>

                <GlobalFilterBar />

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
            </Stack>

            <RecipeDisplay />

            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} >
                <ProteinColumn />
                <VegetableColumn />
                <StarchColumn />
                <AccompanimentColumn />
            </SimpleGrid>
        </Container>
    );
};

export default SingleRecipePage;
