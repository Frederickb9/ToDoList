import { useState } from 'react';
import { useAuthStore } from './store/auth.store';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  const { isAuthenticated } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  if (isAuthenticated) return <Dashboard />;

  if (showRegister) {
    return <Register onSwitch={() => setShowRegister(false)} />;
  }

  return <Login onSwitch={() => setShowRegister(true)} />;
}

export default App;