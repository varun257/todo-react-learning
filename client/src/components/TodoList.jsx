import { Box, CircularProgress, Typography } from '@mui/material';

import TodoItem from './TodoItem';

function TodoList({ todos, status, onToggle, onDelete, onSave }) {
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!todos.length) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
        No todos found. Try adding one or changing search/filter.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {todos.map((todo) => (
        <Box key={todo.id} sx={{ flex: '1 1 340px', minWidth: 280 }}>
          <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} onSave={onSave} />
        </Box>
      ))}
    </Box>
  );
}

export default TodoList;
