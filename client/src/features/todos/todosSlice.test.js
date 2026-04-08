import reducer, { setFilter, setSearchTerm } from './todosSlice';

describe('todos reducer', () => {
  it('should handle setSearchTerm', () => {
    const state = reducer(undefined, setSearchTerm('react'));
    expect(state.searchTerm).toBe('react');
  });

  it('should handle setFilter', () => {
    const state = reducer(undefined, setFilter('completed'));
    expect(state.filter).toBe('completed');
  });
});
