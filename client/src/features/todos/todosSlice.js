import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { todoApi } from '../../api/todoApi';

const initialState = {
  items: [],
  selectedTodo: null,
  status: 'idle',
  error: null,
  searchTerm: '',
  filter: 'all',
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await todoApi.getTodos();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to fetch todos');
  }
});

export const fetchTodoById = createAsyncThunk('todos/fetchTodoById', async (id, { rejectWithValue }) => {
  try {
    const response = await todoApi.getTodoById(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to fetch todo');
  }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (payload, { rejectWithValue }) => {
  try {
    const response = await todoApi.createTodo(payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to create todo');
  }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await todoApi.updateTodo(id, payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to update todo');
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { rejectWithValue }) => {
  try {
    await todoApi.deleteTodo(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to delete todo');
  }
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id, { rejectWithValue }) => {
  try {
    const response = await todoApi.toggleTodo(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to toggle todo');
  }
});

export const clearCompletedTodos = createAsyncThunk('todos/clearCompletedTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await todoApi.clearCompleted();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to clear completed todos');
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    clearSelectedTodo(state) {
      state.selectedTodo = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        state.selectedTodo = action.payload;
      })
      .addCase(fetchTodoById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedTodo?.id === action.payload.id) {
          state.selectedTodo = action.payload;
        }
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedTodo?.id === action.payload.id) {
          state.selectedTodo = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
        if (state.selectedTodo?.id === action.payload) {
          state.selectedTodo = null;
        }
      })
      .addCase(clearCompletedTodos.fulfilled, (state, action) => {
        state.items = action.payload.remainingTodos;
      })
      .addMatcher(
        (action) => action.type.startsWith('todos/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Operation failed';
        }
      );
  },
});

export const { setSearchTerm, setFilter, clearSelectedTodo, clearError } = todosSlice.actions;
export default todosSlice.reducer;
