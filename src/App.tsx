import React, { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { ViewState, User } from './types';

export function App() {
  const [view, setView] = useState<ViewState>('register');
  const [user, setUser] = useState<User | null>(null);

  const handleRegisterSuccess = (newUser: User) => {
    setUser(newUser);
    setView('dashboard');
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-100/50 flex items-center justify-center p-4">
      {view === 'register' && (
        <Register
          onSwitchToLogin={() => setView('login')}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {view === 'login' && (
        <Login
          onSwitchToRegister={() => setView('register')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {view === 'dashboard' && user && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
