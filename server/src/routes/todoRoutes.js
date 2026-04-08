import { Router } from 'express';

import { todoController } from '../controllers/todoController.js';

const todoRouter = Router();

todoRouter.get('/', todoController.getTodos);
todoRouter.get('/:id', todoController.getTodoById);
todoRouter.post('/', todoController.createTodo);
todoRouter.put('/:id', todoController.updateTodo);
todoRouter.patch('/:id/toggle', todoController.toggleTodo);
todoRouter.delete('/completed', todoController.clearCompleted);
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;
