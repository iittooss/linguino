import { Button, Group, Stack, Title, Typography } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

function App() {
  const ButtonLink = ({ title, link }: { title: string; link: string }) => {
    return (
      <Button component={Link} rightSection={<IconExternalLink />} target="_blank" to={link} variant="subtle">
        {title}
      </Button>
    )
  }

  return (
    <Stack align="center" className="my-20" justify="center">
      <Title order={1}>Welcome to the React Based Template</Title>
      <Typography>Find all the technologies used in this template below:</Typography>

      <Group className="text-center">
        <ButtonLink link="https://vitejs.fr/guide/" title="Vite" />
        <ButtonLink link="https://react.dev/" title="React" />
        <ButtonLink link="https://mantine.dev/" title="Mantine" />
        <ButtonLink link="https://tailwindcss.com/" title="Tailwind CSS" />
      </Group>
      <Group>
        <ButtonLink link="https://reactrouter.com/en/main" title="React Router" />
        <ButtonLink link="https://tabler-icons.io/" title="Tabler Icons" />
        <ButtonLink link="https://zustand-demo.pmnd.rs/" title="Zustand" />
        <ButtonLink link="https://biomejs.dev/" title="Biome JS" />
      </Group>
    </Stack>
  )
}

export default App
