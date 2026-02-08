import { ActionIcon, Group, NumberInput } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'

interface INumberInputProps {
  value: number
  onChange: (value: number | string) => void
}

const CountInput: React.FC<INumberInputProps> = ({ value, onChange }) => {
  const handleDecrement = () => {
    if (value - 1 > 0) {
      onChange(value - 1)
    }
  }

  return (
    <Group gap={4}>
      <ActionIcon color="blue" onClick={handleDecrement} size={24}>
        <IconMinus size={16} />
      </ActionIcon>

      <NumberInput
        allowNegative={false}
        className="w-18!"
        hideControls
        onChange={onChange}
        suffix=" pers"
        value={value}
      />

      <ActionIcon color="blue" onClick={() => onChange(value + 1)} size={24}>
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  )
}

export default CountInput
