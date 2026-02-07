import { Button, Container, SimpleGrid, Stack, Title } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import { AccompanimentColumn } from '../components/AccompanimentColumn'
import { GlobalFilterBar } from '../components/GlobalFilterBar'
import { ProteinColumn } from '../components/ProteinColumn'
import { RecipeDisplay } from '../components/RecipeDisplay'
import { StarchColumn } from '../components/StarchColumn'
import { VegetableColumn } from '../components/VegetableColumn'
import { useRecipeStore } from '../store/useRecipeStore'

export const SingleRecipePage = () => {
  const generateRecipe = useRecipeStore(s => s.generateRecipe)

  return (
    <Container fluid py="xl" size="xl">
      <Stack align="center" gap="lg" mb="xl">
        <Stack align="center" gap={4}>
          <Title className="text-4xl font-extrabold text-blue-900" order={1} size={'h2'}>
            Générer une Recette
          </Title>
        </Stack>

        <GlobalFilterBar />

        <Button
          className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          color="blue"
          leftSection={<IconRefresh size={28} />}
          onClick={generateRecipe}
          radius="md"
          size="xl"
          variant="filled"
        >
          Générer une idée
        </Button>
      </Stack>

      <RecipeDisplay />

      <SimpleGrid cols={{ base: 1, lg: 4, md: 2 }}>
        <ProteinColumn />
        <VegetableColumn />
        <StarchColumn />
        <AccompanimentColumn />
      </SimpleGrid>
    </Container>
  )
}

export default SingleRecipePage
