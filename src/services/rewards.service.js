import { supabase } from './supabase';

export const rewardsService = {
  /**
   * Get all available rewards
   * @returns {Promise<Array>}
   */
  async getAllRewards() {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('active', true)
        .order('cost', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching rewards:', error);
      throw error;
    }
  },

  /**
   * Get user's redeemed rewards
   * @param {string} userId 
   * @returns {Promise<Array>}
   */
  async getUserRedemptions(userId) {
    try {
      const { data, error } = await supabase
        .from('user_redemptions')
        .select(`
          *,
          rewards (*)
        `)
        .eq('user_id', userId)
        .order('redeemed_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching redemptions:', error);
      throw error;
    }
  },

  /**
   * Redeem a reward
   * @param {string} userId 
   * @param {string} rewardId 
   * @param {number} userPoints 
   * @returns {Promise<Object>}
   */
  async redeemReward(userId, rewardId, userPoints) {
    try {
      // Get reward details
      const { data: reward, error: rewardError } = await supabase
        .from('rewards')
        .select('*')
        .eq('id', rewardId)
        .single();

      if (rewardError) throw rewardError;

      // Check if user has enough points
      if (userPoints < reward.cost) {
        throw new Error('Insufficient points');
      }

      // Create redemption record
      const { data: redemption, error: redemptionError } = await supabase
        .from('user_redemptions')
        .insert({
          user_id: userId,
          reward_id: rewardId,
          status: 'pending',
        })
        .select()
        .single();

      if (redemptionError) throw redemptionError;

      // Deduct points
      const newPoints = userPoints - reward.cost;
      const { error: updateError } = await supabase
        .from('user_points')
        .update({ points: newPoints })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Log transaction
      await supabase.from('points_transactions').insert({
        user_id: userId,
        points: -reward.cost,
        type: 'redeemed',
        reason: `Redeemed: ${reward.name}`,
      });

      return { success: true, redemption, newPoints };
    } catch (error) {
      console.error('Error redeeming reward:', error);
      throw error;
    }
  },
};