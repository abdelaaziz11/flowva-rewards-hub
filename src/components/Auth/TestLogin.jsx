import React, { useState } from 'react';
import { authService } from '../../services/auth.service';

const TestLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Test123456!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.signIn(email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      await authService.signUp(email, password, { name: 'Test User' });
      alert('Account created! Please check email to confirm (or auto-confirm in Supabase)');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Login to View Notifications</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 text-purple-600 font-semibold py-3 rounded-lg border-2 border-purple-200 transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Default: test@example.com / Test123456!
        </p>
      </div>
    </div>
  );
};

export default TestLogin;