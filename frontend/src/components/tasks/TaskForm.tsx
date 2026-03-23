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

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
  { value: 'critical', label: 'Crítica' },
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
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Nueva tarea</h2>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error instanceof Error ? error.message : 'Error al crear la tarea'}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title')}
          placeholder="¿Qué necesitas hacer?"
          className={`w-full px-3 py-2 text-sm rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.title ? 'border-red-400' : 'border-slate-300'}`}
        />
        {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Descripción</label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="Detalles opcionales..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Prioridad <span className="text-red-500">*</span>
        </label>
        <select
          {...register('priority')}
          className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          {PRIORITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {isPending ? 'Guardando...' : 'Crear tarea'}
      </button>
    </form>
  );
};