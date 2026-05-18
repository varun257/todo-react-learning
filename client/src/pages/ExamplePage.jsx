import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import { useExampleContext } from '../contexts/ExampleContext';

function ExamplePage() {
  const { title, visitCount, setTitle, incrementVisitCount } = useExampleContext();
  const [draftTitle, setDraftTitle] = useState(title);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  useEffect(() => {
    incrementVisitCount();
  }, [incrementVisitCount]);

  return (
    <Container sx={{ py: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This page demonstrates a React context provider shared across the app.
            The example context stores a page title and keeps track of how many times the page has been visited.
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Page title"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              onBlur={() => setTitle(draftTitle)}
              fullWidth
            />

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Visit counter:
              </Typography>
              <Typography variant="h6">{visitCount}</Typography>
            </Box>

            <Button variant="contained" onClick={incrementVisitCount}>
              Record another visit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ExamplePage;
