import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function AppHeader({ mode, onToggleTheme }) {
  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Todo React Revision Lab
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          <Button color="inherit" variant="outlined" onClick={onToggleTheme}>
            Theme: {mode === 'light' ? 'Light' : 'Dark'}
          </Button>
        </Stack>
      </Toolbar>
      <Box sx={{ height: 3, background: 'linear-gradient(90deg, #26c6da, #42a5f5, #66bb6a)' }} />
    </AppBar>
  );
}

export default AppHeader;
