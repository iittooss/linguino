import { AppShell } from '@mantine/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import { BatchRecipePage } from './pages/BatchRecipePage'
import SingleRecipePage from './pages/SingleRecipePage'

function App() {
  return (
    <AppShell header={{ height: 70 }}>
      <Navbar />
      <AppShell.Main pt={0}>
        <Routes>
          <Route element={<SingleRecipePage />} path="/single" />
          <Route element={<BatchRecipePage />} path="/batch" />
          <Route element={<Navigate replace to="/single" />} path="/" />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
