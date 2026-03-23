import { create } from 'zustand';
import { Task } from '../types/task.types';

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (task: Task) => void;
  removeOptimisticTask: (tempId: number) => void;
  replaceTask: (tempId: number, realTask: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
  updateTask: (task) => set((state) => ({ tasks: state.tasks.map((t) => (t.id === task.id ? task : t)) })),
  removeOptimisticTask: (tempId) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== tempId) })),
  replaceTask: (tempId, realTask) => set((state) => ({ tasks: state.tasks.map((t) => (t.id === tempId ? realTask : t)) })),
}));