import { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import AppHeader from './components/AppHeader';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import ExamplePage from './pages/ExamplePage';
import NotFoundPage from './pages/NotFoundPage';
import TodoDetailPage from './pages/TodoDetailPage';
import { ExampleProvider } from './contexts/ExampleContext';
import { createAppTheme } from './theme/theme';

function App() {
  const [mode, setMode] = useState('light');

  // useMemo prevents recreating theme object on every render.
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((previous) => (previous === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExampleProvider>
        <AppHeader mode={mode} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/todos/:id" element={<TodoDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ExampleProvider>
    </ThemeProvider>
  );
}

export default App;
