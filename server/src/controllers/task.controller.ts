import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { taskService } from '../services/task.service';
import { ListTasksQuery, PriorityEnum, StatusEnum } from '../types/task.types';

export class TaskController {
  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await taskService.createTask(req.userId!, req.body);
      res.status(201).json({ data: task, message: 'Tarea creada exitosamente' });
    } catch (error) { next(error); }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const query: ListTasksQuery = {
        priority: req.query.priority as PriorityEnum | undefined,
        status: req.query.status as StatusEnum | undefined,
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 20,
      };
      const result = await taskService.listTasks(req.userId!, query);
      res.json({ data: result.tasks, meta: { total: result.total, page: query.page, limit: query.limit } });
    } catch (error) { next(error); }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = parseInt(req.params['id'] as string, 10);
      const task = await taskService.getTaskById(req.userId!, taskId);
      res.json({ data: task });
    } catch (error) { next(error); }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = parseInt(req.params['id'] as string, 10);
      const task = await taskService.updateTask(req.userId!, taskId, req.body);
      res.json({ data: task, message: 'Tarea actualizada exitosamente' });
    } catch (error) { next(error); }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = parseInt(req.params['id'] as string, 10);
      await taskService.deleteTask(req.userId!, taskId);
      res.json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) { next(error); }
  }
}

export const taskController = new TaskController();