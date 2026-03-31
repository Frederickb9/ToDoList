import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { useAuthStore } from '../store/auth.store';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

const PRIORITY_DOTS = [
  { color: 'bg-rose-300',   label: 'Crítica' },
  { color: 'bg-amber-300',  label: 'Alta' },
  { color: 'bg-sage-300',   label: 'Media' },
  { color: 'bg-stone-300',  label: 'Baja' },
];

export const Dashboard = () => {
  const { user, logout } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-stone-50">

        <header className="bg-white border-b border-stone-100 shadow-soft sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage-100 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-stone-800 leading-none">My Tasks</h1>
                <p className="text-xs text-stone-400 mt-0.5">Hola, {user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-3">
                {PRIORITY_DOTS.map((d) => (
                  <div key={d.label} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${d.color}`} />
                    <span className="text-xs text-stone-400">{d.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={logout}
                className="text-xs text-stone-400 hover:text-rose-500 font-medium transition-colors duration-250"
              >
                Salir
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <TaskForm />
            </div>
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                  Tareas activas
                </h2>
              </div>
              <TaskList />
            </div>
          </div>
        </main>

      </div>
    </QueryClientProvider>
  );
};