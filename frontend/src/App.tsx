import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { Navbar } from './components/Navbar';
import SingleRecipePage from './pages/SingleRecipePage';
import { BatchRecipePage } from './pages/BatchRecipePage';

function App() {
  return (
    <AppShell header={{ height: 70 }}>
      <Navbar />
      <AppShell.Main>
        <Routes>
          <Route path="/single" element={<SingleRecipePage />} />
          <Route path="/batch" element={<BatchRecipePage />} />
          <Route path="/" element={<Navigate to="/single" replace />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
