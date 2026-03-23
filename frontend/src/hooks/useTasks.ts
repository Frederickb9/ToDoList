import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/task.service';
import { useTaskStore } from '../store/task.store';
import { CreateTaskPayload, UpdateTaskPayload, Task } from '../types/task.types';

const TASKS_KEY = ['tasks'] as const;

export const useTasks = () => {
  const { setTasks } = useTaskStore();
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: async () => {
      const result = await taskService.list();
      setTasks(result.data);
      return result;
    },
    staleTime: 1000 * 30,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { addTask, removeOptimisticTask, replaceTask } = useTaskStore();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskService.create(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });
      const tempId = Date.now() * -1;
      const optimisticTask: Task = {
        id: tempId, userId: 0, categoryId: null,
        title: payload.title, description: payload.description ?? null,
        priority: payload.priority, status: 'pending',
        dueDate: null, position: 0,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      };
      addTask(optimisticTask);
      return { tempId };
    },
    onSuccess: (realTask, _v, context) => {
      if (context) replaceTask(context.tempId, realTask);
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    },
    onError: (_e, _v, context) => {
      if (context) removeOptimisticTask(context.tempId);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { updateTask } = useTaskStore();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateTaskPayload }) =>
      taskService.update(id, payload),
    onSuccess: (updatedTask) => {
      updateTask(updatedTask);
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { removeTask } = useTaskStore();
  return useMutation({
    mutationFn: (id: number) => taskService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });
      removeTask(id);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
    },
  });
};