import { Container, Stack, Title } from '@mantine/core'
import { BatchRecipe } from '../components/batchRecipe/BatchRecipe'
import { NutritionalInfoModal } from '../components/batchRecipe/NutritionalInfoModal'
import { GlobalFilterBar } from '../components/GlobalFilterBar'

export const BatchRecipePage = () => {
  return (
    <Container py="xl" size="xl">
      <Stack>
        <Stack>
          <Title c="blue.9" order={1} size={'h2'}>
            Planification groupées
          </Title>
        </Stack>

        <GlobalFilterBar />
        <BatchRecipe />
      </Stack>
      <NutritionalInfoModal />
    </Container>
  )
}
