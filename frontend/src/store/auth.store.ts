import { create } from 'zustand';
import { authService } from '../services/auth.service';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: authService.getUser(),
  isAuthenticated: authService.isAuthenticated(),

  login: (token, user) => {
    authService.saveSession(token, user);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));