import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export const Dashboard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Tasks</h1>
              <p className="text-xs text-slate-500 mt-0.5">Organiza tus actividades por prioridad</p>
            </div>
            <div className="flex gap-1">
              {(['critical', 'high', 'medium', 'low'] as const).map((p) => (
                <div key={p} className={`w-2.5 h-2.5 rounded-full ${{ critical: 'bg-red-400', high: 'bg-amber-400', medium: 'bg-indigo-400', low: 'bg-slate-400' }[p]}`} />
              ))}
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-2">
              <TaskForm />
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">Tareas activas</h2>
              <TaskList />
            </div>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};