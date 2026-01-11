import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { MantineConfig } from './config/mantine/Mantine.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MantineConfig>
      <App />
    </MantineConfig>
  </BrowserRouter>,
)
