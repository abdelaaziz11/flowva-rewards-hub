import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { RewardsProvider } from './context/RewardsContext';
import RewardsHub from './pages/RewardsHub';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './context/AuthContext';

function AppContent() {
  const { user, loading } = useAuthContext();
  const path = window.location.pathname;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show signup page
  if (path === '/signup') {
    return user ? <RewardsProvider><RewardsHub /></RewardsProvider> : <Signup />;
  }

  // Show login if no user
  if (!user) {
    return <Login />;
  }

  // Show app if user is logged in
  return (
    <RewardsProvider>
      <RewardsHub />
    </RewardsProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;