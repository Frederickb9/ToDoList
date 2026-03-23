import { useTasks } from '../../hooks/useTasks';
import { useTaskStore } from '../../store/task.store';
import { TaskCard } from './TaskCard';
import { Priority } from '../../types/task.types';

const PRIORITY_ORDER: Priority[] = ['critical', 'high', 'medium', 'low'];

export const TaskList = () => {
  const { isLoading, isError } = useTasks();
  const tasks = useTaskStore((s) => s.tasks);
  const sorted = [...tasks].sort((a, b) =>
    PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)
  );

  if (isLoading) return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />)}
    </div>
  );

  if (isError) return (
    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-4 rounded-xl">
      No se pudieron cargar las tareas.
    </div>
  );

  if (sorted.length === 0) return (
    <div className="text-center py-16 text-slate-400">
      <p className="text-4xl mb-3">📋</p>
      <p className="text-sm font-medium">Sin tareas todavía</p>
      <p className="text-xs mt-1">Crea tu primera tarea arriba</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {sorted.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  );
};