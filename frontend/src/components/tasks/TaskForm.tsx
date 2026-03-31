import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTask } from '../../hooks/useTasks';
import { Priority } from '../../types/task.types';

const schema = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(200),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
});

type FormData = z.infer<typeof schema>;

const PRIORITY_OPTIONS: { value: Priority; label: string; dot: string }[] = [
  { value: 'low',      label: 'Baja',    dot: 'bg-stone-300' },
  { value: 'medium',   label: 'Media',   dot: 'bg-sage-400' },
  { value: 'high',     label: 'Alta',    dot: 'bg-amber-400' },
  { value: 'critical', label: 'Crítica', dot: 'bg-rose-400' },
];

export const TaskForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { mutate: createTask, isPending, isError, error } = useCreateTask();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { priority: 'medium' },
  });

  const onSubmit = (data: FormData) => {
    createTask(data, { onSuccess: () => { reset(); onSuccess?.(); } });
  };

  return (
    <div className="card p-6 space-y-5">
      <div>
        <h2 className="text-base font-semibold text-stone-700">Nueva tarea</h2>
        <p className="text-xs text-stone-400 mt-0.5">Añade una actividad a tu lista</p>
      </div>

      {isError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs px-4 py-3 rounded-xl">
          {error instanceof Error ? error.message : 'Error al crear la tarea'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
            Título <span className="text-rose-400">*</span>
          </label>
          <input
            {...register('title')}
            placeholder="¿Qué necesitas hacer?"
            className={`input-field ${errors.title ? 'border-rose-300 focus:ring-rose-200' : ''}`}
          />
          {errors.title && <p className="text-xs text-rose-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Descripción</label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Detalles opcionales..."
            className="input-field resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
            Prioridad <span className="text-rose-400">*</span>
          </label>
          <select {...register('priority')} className="input-field">
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isPending} className="btn-primary w-full">
          {isPending ? 'Guardando...' : 'Crear tarea'}
        </button>
      </form>
    </div>
  );
};