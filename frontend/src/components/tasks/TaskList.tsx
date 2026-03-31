import { useTasks } from '../../hooks/useTasks';
import { useTaskStore } from '../../store/task.store';
import { TaskCard } from './TaskCard';
import { Priority } from '../../types/task.types';

const PRIORITY_ORDER: Priority[] = ['critical', 'high', 'medium', 'low'];

export const TaskList = () => {
  const { isLoading, isError } = useTasks();
  const tasks = useTaskStore((s) => s.tasks);
  const sorted = [...tasks].sort(
    (a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)
  );

  if (isLoading) return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card p-5 animate-pulse">
          <div className="h-4 bg-stone-100 rounded-lg w-3/4 mb-3" />
          <div className="h-3 bg-stone-100 rounded-lg w-1/2" />
        </div>
      ))}
    </div>
  );

  if (isError) return (
    <div className="card p-5 border-rose-200">
      <p className="text-sm text-rose-500">No se pudieron cargar las tareas.</p>
    </div>
  );

  if (sorted.length === 0) return (
    <div className="card p-12 text-center">
      <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="text-sm font-medium text-stone-500">Sin tareas todavía</p>
      <p className="text-xs text-stone-400 mt-1">Crea tu primera tarea en el formulario</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {sorted.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};