import { todoService } from '../services/todoService.js';

export const todoController = {
  async getTodos(_req, res, next) {
    try {
      const todos = await todoService.getAll();
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  },

  async getTodoById(req, res, next) {
    try {
      const todo = await todoService.getById(req.params.id);

      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  },

  async createTodo(req, res, next) {
    try {
      const createdTodo = await todoService.create(req.body);
      res.status(201).json(createdTodo);
    } catch (error) {
      next(error);
    }
  },

  async updateTodo(req, res, next) {
    try {
      const updatedTodo = await todoService.update(req.params.id, req.body);

      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      return res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  },

  async deleteTodo(req, res, next) {
    try {
      const deleted = await todoService.remove(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async toggleTodo(req, res, next) {
    try {
      const toggledTodo = await todoService.toggle(req.params.id);

      if (!toggledTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      return res.status(200).json(toggledTodo);
    } catch (error) {
      next(error);
    }
  },

  async clearCompleted(req, res, next) {
    try {
      const summary = await todoService.clearCompleted();
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  },
};
