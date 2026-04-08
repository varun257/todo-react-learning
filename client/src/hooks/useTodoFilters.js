import { useMemo } from 'react';

export function useTodoFilters(todos, filter, searchTerm) {
  // useMemo avoids recomputing filtered list when unrelated state changes.
  return useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchesFilter =
        filter === 'all' ? true : filter === 'active' ? !todo.completed : todo.completed;

      const matchesSearch =
        normalizedSearch.length === 0
          ? true
          : todo.title.toLowerCase().includes(normalizedSearch) ||
            (todo.description || '').toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, searchTerm]);
}
