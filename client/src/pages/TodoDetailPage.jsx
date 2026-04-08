import { useEffect } from 'react';
import { Alert, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearSelectedTodo, fetchTodoById } from '../features/todos/todosSlice';

function TodoDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedTodo, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodoById(id));

    return () => {
      dispatch(clearSelectedTodo());
    };
  }, [dispatch, id]);

  return (
    <Container sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Button component={RouterLink} to="/" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          Back to dashboard
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        {!selectedTodo ? (
          <Typography variant="body1">Loading todo details...</Typography>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {selectedTodo.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedTodo.description || 'No description'}
              </Typography>
              <Typography variant="body2">Status: {selectedTodo.completed ? 'Completed' : 'Active'}</Typography>
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(selectedTodo.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Container>
  );
}

export default TodoDetailPage;
