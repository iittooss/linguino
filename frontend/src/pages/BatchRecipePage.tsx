import { Container, Stack, Title, Text } from '@mantine/core';
import { GlobalFilterBar } from '../components/GlobalFilterBar';
import { BatchRecipeTable } from '../components/BatchRecipeTable';

export const BatchRecipePage = () => {
    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <Stack gap={4}>
                    <Title order={1} c="blue.9">Planification de la semaine</Title>
                    <Text c="dimmed" size="lg">Générez et personnalisez votre menu complet en quelques clics.</Text>
                </Stack>

                <GlobalFilterBar />
                <BatchRecipeTable />
            </Stack>
        </Container>
    );
};
