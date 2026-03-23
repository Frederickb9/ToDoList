import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'El título no puede estar vacío').max(200).trim(),
  description: z.string().max(2000).trim().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  categoryId: z.number().int().positive().optional(),
  dueDate: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).trim().optional(),
  description: z.string().max(2000).trim().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  dueDate: z.string().optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;