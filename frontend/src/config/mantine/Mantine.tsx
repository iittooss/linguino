import { createTheme, MantineProvider } from '@mantine/core'
import type { FC, ReactNode } from 'react'

interface IMantineProviderProps {
  children?: ReactNode
}

const theme = createTheme({
  /** Put your mantine theme override here */
})

export const MantineConfig: FC<IMantineProviderProps> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}
