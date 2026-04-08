import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Container sx={{ py: 5, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Page not found.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Go Home
      </Button>
    </Container>
  );
}

export default NotFoundPage;
