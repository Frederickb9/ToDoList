import api from './api';

interface AuthResponse {
  data: {
    user: { id: number; name: string; email: string };
    token: string;
  };
}

export const authService = {
  async register(name: string, email: string, password: string): Promise<AuthResponse['data']> {
    const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password });
    return data.data;
  },

  async login(email: string, password: string): Promise<AuthResponse['data']> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): { id: number; name: string; email: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  saveSession(token: string, user: { id: number; name: string; email: string }): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};