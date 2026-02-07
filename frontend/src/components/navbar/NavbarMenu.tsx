import { Burger, Button, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconListNumbers, IconToolsKitchen2 } from '@tabler/icons-react'
import { NavLink, useLocation } from 'react-router-dom'
import useBreakpoint, { EBreakpoint } from '../../hooks/useBreakpoint'

const NavbarMenu: React.FC = () => {
  const location = useLocation()
  const { breakpoint } = useBreakpoint()
  const [opened, { toggle }] = useDisclosure()

  if (breakpoint >= EBreakpoint.MD) {
    return (
      <Group gap="md" justify="center">
        <Button
          component={NavLink}
          leftSection={<IconToolsKitchen2 size={20} />}
          radius="md"
          to="/single"
          variant={location.pathname === '/single' || location.pathname === '/' ? 'filled' : 'subtle'}
        >
          Générer une recette
        </Button>
        <Button
          color="teal"
          component={NavLink}
          leftSection={<IconListNumbers size={20} />}
          radius="md"
          to="/batch"
          variant={location.pathname === '/batch' ? 'filled' : 'subtle'}
        >
          Plusieurs recettes
        </Button>
      </Group>
    )
  }

  return (
    <>
      <Burger aria-label="Toggle navigation" onClick={toggle} opened={opened} />

      <div className="absolute right-0 top-full">
        {opened && (
          <Stack className="bg-white p-4 rounded shadow-md mt-2">
            <Button
              component={NavLink}
              leftSection={<IconToolsKitchen2 size={20} />}
              onClick={toggle}
              radius="md"
              to="/single"
              variant={location.pathname === '/single' || location.pathname === '/' ? 'filled' : 'subtle'}
            >
              Générer une recette
            </Button>
            <Button
              color="teal"
              component={NavLink}
              leftSection={<IconListNumbers size={20} />}
              onClick={toggle}
              radius="md"
              to="/batch"
              variant={location.pathname === '/batch' ? 'filled' : 'subtle'}
            >
              Plusieurs recettes
            </Button>
          </Stack>
        )}
      </div>
    </>
  )
}

export default NavbarMenu
