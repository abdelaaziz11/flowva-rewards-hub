import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { RewardsProvider } from './context/RewardsContext';
import RewardsHub from './pages/RewardsHub';
import './testSupabase';

function App() {
  return (
    <AuthProvider>
      <RewardsProvider>
        <RewardsHub />
      </RewardsProvider>
    </AuthProvider>
  );
}

export default App;