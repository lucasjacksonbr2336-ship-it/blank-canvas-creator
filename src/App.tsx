import React, { useState, useEffect } from 'react';
import { User } from './types/auth';
import { getCurrentUser, setCurrentUser } from './utils/storage';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

export function App() {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [view, setView] = useState<'register' | 'login'>('register');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUserState(user);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentUserState(null);
    setView('login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      {currentUser ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : view === 'register' ? (
        <Register
          onRegisterSuccess={(user) => setCurrentUserState(user)}
          onSwitchToLogin={() => setView('login')}
        />
      ) : (
        <Login
          onLoginSuccess={(user) => setCurrentUserState(user)}
          onSwitchToRegister={() => setView('register')}
        />
      )}
    </div>
  );
}

export default App;
