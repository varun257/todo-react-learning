import { Card, CardContent, Container, List, ListItem, ListItemText, Typography } from '@mui/material';

function AboutPage() {
  return (
    <Container sx={{ py: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            About This Revision Project
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This app intentionally demonstrates React fundamentals in one place so you can revisit quickly.
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="React Router" secondary="Navigation between dashboard, details, and about pages." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Redux Toolkit" secondary="Global todo state, reducers, async thunks, loading/error handling." />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Hooks"
                secondary="useEffect for data fetch, useCallback for handlers, useMemo for filtering, useRef for non-rendering values and autofocus."
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Material UI + Flexbox" secondary="Responsive and reusable component patterns." />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AboutPage;
