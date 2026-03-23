import { prisma } from '../config/db';
import { CreateTaskDto, UpdateTaskDto } from '../validators/task.validator';
import { ListTasksQuery, TaskResponse } from '../types/task.types';
import { Priority, Status } from '@prisma/client';

export class TaskService {
  async createTask(userId: number, dto: CreateTaskDto): Promise<TaskResponse> {
    const lastTask = await prisma.task.findFirst({
      where: { userId },
      orderBy: { position: 'desc' },
      select: { position: true },
    });
    const nextPosition = (lastTask?.position ?? -1) + 1;
    const task = await prisma.task.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description ?? null,
        priority: dto.priority as Priority,
        categoryId: dto.categoryId ?? null,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        position: nextPosition,
      },
    });
    return task as TaskResponse;
  }

  async listTasks(userId: number, query: ListTasksQuery): Promise<{ tasks: TaskResponse[]; total: number }> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, query.limit ?? 20);
    const skip = (page - 1) * limit;
    const where = {
      userId,
      ...(query.priority && { priority: query.priority as Priority }),
      ...(query.status && { status: query.status as Status }),
    };
    const [tasks, total] = await prisma.$transaction([
      prisma.task.findMany({ where, orderBy: [{ position: 'asc' }, { createdAt: 'desc' }], skip, take: limit }),
      prisma.task.count({ where }),
    ]);
    return { tasks: tasks as TaskResponse[], total };
  }

  async getTaskById(userId: number, taskId: number): Promise<TaskResponse> {
    const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
    if (!task) {
      const error = new Error('Tarea no encontrada') as any;
      error.statusCode = 404;
      throw error;
    }
    return task as TaskResponse;
  }

  async updateTask(userId: number, taskId: number, dto: UpdateTaskDto): Promise<TaskResponse> {
    const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
    if (!task) {
      const error = new Error('Tarea no encontrada') as any;
      error.statusCode = 404;
      throw error;
    }
    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.priority && { priority: dto.priority as Priority }),
        ...(dto.status && { status: dto.status as Status }),
        ...(dto.dueDate !== undefined && { dueDate: dto.dueDate ? new Date(dto.dueDate) : null }),
      },
    });
    return updated as TaskResponse;
  }

  async deleteTask(userId: number, taskId: number): Promise<void> {
    const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
    if (!task) {
      const error = new Error('Tarea no encontrada') as any;
      error.statusCode = 404;
      throw error;
    }
    await prisma.task.delete({ where: { id: taskId } });
  }
}

export const taskService = new TaskService();