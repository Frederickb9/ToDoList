import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

interface LoginProps {
  onSwitch: () => void;
}

export const Login = ({ onSwitch }: LoginProps) => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      login(token, user);
    } catch {
      setError('Email o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-100 rounded-2xl mb-4">
            <svg className="w-6 h-6 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-stone-800 tracking-tight">Bienvenido</h1>
          <p className="text-stone-400 text-sm mt-1">Inicia sesión para ver tus tareas</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="input-field"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2">
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-center text-sm text-stone-400 mt-6">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={onSwitch} className="text-sage-600 hover:text-sage-700 font-medium transition-colors duration-250">
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};