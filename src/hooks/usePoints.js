import { useState, useEffect } from 'react';
import { pointsService } from '../services/points.service';

export const usePoints = (userId) => {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      loadPoints();
    } else {
      // No user logged in, show default values
      setPoints(0);
      setStreak(0);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const loadPoints = async () => {
    try {
      setLoading(true);
      const data = await pointsService.getUserPoints(userId);
      setPoints(data.points);
      setStreak(data.streak);
    } catch (err) {
      setError(err.message);
      console.error('Error loading points:', err);
      // Set defaults on error
      setPoints(0);
      setStreak(0);
    } finally {
      setLoading(false);
    }
  };

  const claimDaily = async () => {
    if (!userId) {
      throw new Error('Please sign in to claim points');
    }
    
    try {
      setError(null);
      const result = await pointsService.claimDailyPoints(userId);
      if (result.success) {
        setPoints(result.points);
        setStreak(prev => prev + 1);
        return result;
      }
      throw new Error(result.message || 'Failed to claim points');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const addPoints = async (amount, reason) => {
    if (!userId) {
      throw new Error('Please sign in to earn points');
    }
    
    try {
      setError(null);
      const result = await pointsService.addPoints(userId, amount, reason);
      setPoints(result.newPoints);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    points,
    streak,
    loading,
    error,
    claimDaily,
    addPoints,
    refreshPoints: loadPoints,
  };
};