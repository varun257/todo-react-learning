import { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmDialog from '../components/ConfirmDialog';
import FilterBar from '../components/FilterBar';
import StatusBanner from '../components/StatusBanner';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import { useTodoFilters } from '../hooks/useTodoFilters';
import {
  clearCompletedTodos,
  clearError,
  createTodo,
  deleteTodo,
  fetchTodos,
  setFilter,
  setSearchTerm,
  toggleTodo,
  updateTodo,
} from '../features/todos/todosSlice';

function DashboardPage() {
  const dispatch = useDispatch();
  const { items, status, error, filter, searchTerm } = useSelector((state) => state.todos);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // useRef stores value across renders without re-rendering.
  const previousVisibleCountRef = useRef(0);

  const filteredTodos = useTodoFilters(items, filter, searchTerm);

  useEffect(() => {
    // useEffect runs once here to load initial data from backend API.
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    previousVisibleCountRef.current = filteredTodos.length;
  }, [filteredTodos.length]);

  // useCallback memoizes handlers so child components don't re-render unnecessarily.
  const handleCreateTodo = useCallback(
    (payload) => {
      dispatch(createTodo(payload));
    },
    [dispatch]
  );

  const handleToggleTodo = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch]
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  const handleSaveTodo = useCallback(
    (id, payload) => {
      dispatch(updateTodo({ id, payload }));
    },
    [dispatch]
  );

  const closeError = () => dispatch(clearError());

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Todo Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredTodos.length} items (previous render: {previousVisibleCountRef.current})
      </Typography>

      <TodoInput onCreate={handleCreateTodo} />

      <FilterBar
        filter={filter}
        searchTerm={searchTerm}
        onFilterChange={(value) => dispatch(setFilter(value))}
        onSearchChange={(value) => dispatch(setSearchTerm(value))}
        onClearCompleted={() => setConfirmOpen(true)}
      />

      <TodoList
        todos={filteredTodos}
        status={status}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onSave={handleSaveTodo}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Clear completed todos"
        description="This will delete all completed todos. Continue?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          dispatch(clearCompletedTodos());
          setConfirmOpen(false);
        }}
      />

      <StatusBanner error={error} onClose={closeError} />
    </Container>
  );
}

export default DashboardPage;
