import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { IconInfoCircle, IconRefresh, IconTrash } from '@tabler/icons-react'
import type { GeneratedMeal } from '../../data/types'
import { useBatchRecipeStore } from '../../store/useBatchRecipeStore'
import CountInput from '../commun/NumberInput'

interface IBatchRecipeCardActionsProps {
  meal: GeneratedMeal
  peopleCount: number
}

const BatchRecipeCardActions: React.FC<IBatchRecipeCardActionsProps> = ({ meal, peopleCount }) => {
  const { removeBatchRecipe, rerollBatchRow, updateMealPeopleCount, openNutritionalModal } = useBatchRecipeStore()

  return (
    <Group justify="space-between">
      <ActionIcon onClick={() => openNutritionalModal(meal)} radius={'xl'} variant="light">
        <IconInfoCircle />
      </ActionIcon>
      <Group gap={4} wrap="nowrap">
        <CountInput onChange={val => updateMealPeopleCount(meal.id, Number(val))} value={peopleCount} />
        <Tooltip label="Relancer tout le repas" position="top" withArrow>
          <ActionIcon color="teal" onClick={() => rerollBatchRow(meal.id)} variant="subtle">
            <IconRefresh />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Supprimer" position="top" withArrow>
          <ActionIcon color="red" onClick={() => removeBatchRecipe(meal.id)} variant="subtle">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  )
}

export default BatchRecipeCardActions
