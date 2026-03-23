import api from './api';
import { Task, CreateTaskPayload, UpdateTaskPayload, ApiResponse, PaginatedResponse } from '../types/task.types';

export const taskService = {
  async create(payload: CreateTaskPayload): Promise<Task> {
    const { data } = await api.post<ApiResponse<Task>>('/tasks', payload);
    return data.data;
  },
  async list(): Promise<PaginatedResponse<Task>> {
    const { data } = await api.get<PaginatedResponse<Task>>('/tasks');
    return data;
  },
  async getById(id: number): Promise<Task> {
    const { data } = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
    return data.data;
  },
  async update(id: number, payload: UpdateTaskPayload): Promise<Task> {
    const { data } = await api.put<ApiResponse<Task>>(`/tasks/${id}`, payload);
    return data.data;
  },
  async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};