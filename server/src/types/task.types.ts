export enum PriorityEnum {
  low = 'low',
  medium = 'medium',
  high = 'high',
  critical = 'critical',
}

export enum StatusEnum {
  pending = 'pending',
  in_progress = 'in_progress',
  completed = 'completed',
}

export interface TaskResponse {
  id: number;
  userId: number;
  categoryId: number | null;
  title: string;
  description: string | null;
  priority: PriorityEnum;
  status: StatusEnum;
  dueDate: Date | null;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: PriorityEnum;
  categoryId?: number;
  dueDate?: string;
}

export interface ListTasksQuery {
  priority?: PriorityEnum;
  status?: StatusEnum;
  page?: number;
  limit?: number;
}