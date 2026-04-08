import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const client = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export const todoApi = {
  getTodos: () => client.get('/api/todos'),
  getTodoById: (id) => client.get(`/api/todos/${id}`),
  createTodo: (payload) => client.post('/api/todos', payload),
  updateTodo: (id, payload) => client.put(`/api/todos/${id}`, payload),
  deleteTodo: (id) => client.delete(`/api/todos/${id}`),
  toggleTodo: (id) => client.patch(`/api/todos/${id}/toggle`),
  clearCompleted: () => client.delete('/api/todos/completed'),
};
