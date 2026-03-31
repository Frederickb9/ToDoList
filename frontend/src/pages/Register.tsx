import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

interface RegisterProps {
  onSwitch: () => void;
}

export const Register = ({ onSwitch }: RegisterProps) => {
  const { login } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { token, user } = await authService.register(name, email, password);
      login(token, user);
    } catch {
      setError('Error al registrarse. El email puede estar en uso.');
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-stone-800 tracking-tight">Crear cuenta</h1>
          <p className="text-stone-400 text-sm mt-1">Empieza a organizar tus tareas hoy</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Tu nombre"
                className="input-field"
              />
            </div>

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
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="input-field"
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2">
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-stone-400 mt-6">
            ¿Ya tienes cuenta?{' '}
            <button type="button" onClick={onSwitch} className="text-sage-600 hover:text-sage-700 font-medium transition-colors duration-250">
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};