import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/todos.json');

async function readTodos() {
  const fileContents = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(fileContents);
}

async function writeTodos(todos) {
  await fs.writeFile(dataFilePath, JSON.stringify(todos, null, 2));
}

function buildTodo(input) {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    title: input.title.trim(),
    description: (input.description || '').trim(),
    completed: Boolean(input.completed),
    createdAt: now,
    updatedAt: now,
  };
}

function validateTodoPayload(payload, { requireTitle = true } = {}) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return 'Payload must be a JSON object';
  }

  if (requireTitle && typeof payload.title !== 'string') {
    return 'title is required and must be a string';
  }

  if (Object.hasOwn(payload, 'title') && typeof payload.title !== 'string') {
    return 'title must be a string';
  }

  if (Object.hasOwn(payload, 'description') && typeof payload.description !== 'string') {
    return 'description must be a string';
  }

  if (Object.hasOwn(payload, 'completed') && typeof payload.completed !== 'boolean') {
    return 'completed must be a boolean';
  }

  if (Object.hasOwn(payload, 'title') && payload.title.trim().length === 0) {
    return 'title cannot be empty';
  }

  return null;
}

export const todoService = {
  async getAll() {
    return readTodos();
  },

  async getById(id) {
    const todos = await readTodos();
    return todos.find((todo) => todo.id === id) || null;
  },

  async create(payload) {
    const validationError = validateTodoPayload(payload, { requireTitle: true });
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      throw error;
    }

    const todos = await readTodos();
    const newTodo = buildTodo(payload);
    todos.unshift(newTodo);
    await writeTodos(todos);
    return newTodo;
  },

  async update(id, payload) {
    const validationError = validateTodoPayload(payload, { requireTitle: true });
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      throw error;
    }

    const todos = await readTodos();
    const targetIndex = todos.findIndex((todo) => todo.id === id);

    if (targetIndex === -1) {
      return null;
    }

    const updated = {
      ...todos[targetIndex],
      title: payload.title.trim(),
      description: (payload.description || '').trim(),
      completed: Boolean(payload.completed),
      updatedAt: new Date().toISOString(),
    };

    todos[targetIndex] = updated;
    await writeTodos(todos);
    return updated;
  },

  async remove(id) {
    const todos = await readTodos();
    const nextTodos = todos.filter((todo) => todo.id !== id);

    if (nextTodos.length === todos.length) {
      return false;
    }

    await writeTodos(nextTodos);
    return true;
  },

  async toggle(id) {
    const todos = await readTodos();
    const targetIndex = todos.findIndex((todo) => todo.id === id);

    if (targetIndex === -1) {
      return null;
    }

    const updated = {
      ...todos[targetIndex],
      completed: !todos[targetIndex].completed,
      updatedAt: new Date().toISOString(),
    };

    todos[targetIndex] = updated;
    await writeTodos(todos);
    return updated;
  },

  async clearCompleted() {
    const todos = await readTodos();
    const remainingTodos = todos.filter((todo) => !todo.completed);
    const removedCount = todos.length - remainingTodos.length;
    await writeTodos(remainingTodos);
    return { removedCount, remainingTodos };
  },
};
