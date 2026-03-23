import { useState } from 'react';
import { Task, UpdateTaskPayload, Priority, TaskStatus } from '../../types/task.types';
import { PRIORITY_CONFIG } from '../../utils/priority.utils';
import { useUpdateTask, useDeleteTask } from '../../hooks/useTasks';

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'completed', label: 'Completada' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
  { value: 'critical', label: 'Crítica' },
];

export const TaskCard = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UpdateTaskPayload>({
    title: task.title,
    description: task.description ?? '',
    priority: task.priority,
    status: task.status,
  });

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const config = PRIORITY_CONFIG[task.priority];
  const isOptimistic = task.id < 0;

  const handleSave = () => {
    updateTask({ id: task.id, payload: editData }, { onSuccess: () => setIsEditing(false) });
  };

  const handleDelete = () => {
    if (window.confirm('¿Eliminar esta tarea?')) deleteTask(task.id);
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-indigo-200 rounded-xl p-4 shadow-sm space-y-3">
        <input
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Título"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Descripción"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value as Priority })}
            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {PRIORITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value as TaskStatus })}
            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-lg transition"
          >
            {isUpdating ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border-l-4 ${config.borderClass} border border-slate-200 rounded-xl p-4 shadow-sm ${isOptimistic ? 'opacity-60 animate-pulse' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold text-slate-800 truncate ${task.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${config.badgeClass}`}>
          {config.label}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400">
          {{ pending: 'Pendiente', in_progress: 'En progreso', completed: 'Completada' }[task.status]}
        </span>
        {!isOptimistic && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs text-red-500 hover:text-red-700 font-medium transition"
            >
              {isDeleting ? '...' : 'Eliminar'}
            </button>
          </div>
        )}
      </div>
      {isOptimistic && <p className="text-xs text-indigo-400 mt-1">Guardando...</p>}
    </div>
  );
};