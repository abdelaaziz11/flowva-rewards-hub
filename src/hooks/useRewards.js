import { useState, useEffect } from 'react';
import { rewardsService } from '../services/rewards.service';

export const useRewards = (userId) => {
  const [rewards, setRewards] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const rewardsData = await rewardsService.getAllRewards();
      setRewards(rewardsData || []);
      
      // Only load redemptions if user is logged in
      if (userId) {
        const redemptionsData = await rewardsService.getUserRedemptions(userId);
        setRedemptions(redemptionsData || []);
      } else {
        setRedemptions([]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error loading rewards:', err);
      setRewards([]);
      setRedemptions([]);
    } finally {
      setLoading(false);
    }
  };

  const redeemReward = async (rewardId, userPoints) => {
    if (!userId) {
      throw new Error('Please sign in to redeem rewards');
    }
    
    try {
      setError(null);
      const result = await rewardsService.redeemReward(userId, rewardId, userPoints);
      await loadData(); // Refresh data
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    rewards,
    redemptions,
    loading,
    error,
    redeemReward,
    refreshRewards: loadData,
  };
};