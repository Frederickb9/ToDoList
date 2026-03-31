import { useState } from 'react';
import { Task, UpdateTaskPayload, Priority, TaskStatus } from '../../types/task.types';
import { PRIORITY_CONFIG } from '../../utils/priority.utils';
import { useUpdateTask, useDeleteTask } from '../../hooks/useTasks';

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'pending',     label: 'Pendiente' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'completed',   label: 'Completada' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low',      label: 'Baja' },
  { value: 'medium',   label: 'Media' },
  { value: 'high',     label: 'Alta' },
  { value: 'critical', label: 'Crítica' },
];

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending:     'Pendiente',
  in_progress: 'En progreso',
  completed:   'Completada',
};

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
  const isCompleted = task.status === 'completed';

  const handleSave = () => {
    updateTask({ id: task.id, payload: editData }, { onSuccess: () => setIsEditing(false) });
  };

  const handleDelete = () => {
    if (window.confirm('¿Eliminar esta tarea?')) deleteTask(task.id);
  };

  if (isEditing) {
    return (
      <div className="card border-l-4 border-l-sage-300 p-5 space-y-3">
        <input
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="input-field font-medium"
          placeholder="Título"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          rows={2}
          className="input-field resize-none text-sm"
          placeholder="Descripción"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value as Priority })}
            className="input-field text-sm"
          >
            {PRIORITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value as TaskStatus })}
            className="input-field text-sm"
          >
            {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={handleSave} disabled={isUpdating} className="btn-primary flex-1 text-xs py-2">
            {isUpdating ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button onClick={() => setIsEditing(false)} className="btn-ghost flex-1 text-xs py-2">
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`card border-l-4 ${config.borderClass} p-5 group
      hover:shadow-medium hover:-translate-y-0.5 transition-all duration-250
      ${isOptimistic ? 'opacity-50' : ''}
      ${isCompleted ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium text-stone-700 leading-snug
            ${isCompleted ? 'line-through text-stone-400' : ''}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${config.badgeClass}`}>
          {config.label}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
          <span className="text-xs text-stone-400">{STATUS_LABEL[task.status]}</span>
        </div>

        {!isOptimistic && (
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-stone-400 hover:text-sage-600 font-medium transition-colors duration-250"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs text-stone-400 hover:text-rose-500 font-medium transition-colors duration-250"
            >
              {isDeleting ? '...' : 'Eliminar'}
            </button>
          </div>
        )}
      </div>

      {isOptimistic && (
        <p className="text-xs text-sage-400 mt-2">Guardando...</p>
      )}
    </div>
  );
};