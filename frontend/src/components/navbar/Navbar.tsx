import { AppShell, Container, Group, Text } from '@mantine/core'
import { IconChefHat } from '@tabler/icons-react'
import NavbarMenu from './NavbarMenu'

export const Navbar = () => {
  return (
    <AppShell.Header
      className="relative"
      px="md"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid var(--mantine-color-gray-2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container fluid h="100%" size="xl">
        <Group h="100%" justify="space-between">
          <Group gap="xs">
            <IconChefHat color="var(--mantine-color-blue-6)" size={28} />
            <Text
              className="tracking-tight bg-linear-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
              fw={800}
              size="xl"
            >
              Linguino
            </Text>
          </Group>
          <NavbarMenu />
        </Group>
      </Container>
    </AppShell.Header>
  )
}
