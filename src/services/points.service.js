import { supabase } from './supabase';

export const pointsService = {
  /**
   * Get user points and streak data
   * @param {string} userId 
   * @returns {Promise<Object>}
   */
  async getUserPoints(userId) {
    try {
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user points:', error);
      throw error;
    }
  },

  /**
   * Claim daily points
   * @param {string} userId 
   * @returns {Promise<Object>}
   */
  async claimDailyPoints(userId) {
    try {
      const { data, error } = await supabase.rpc('claim_daily_points', {
        user_uuid: userId,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error claiming daily points:', error);
      throw error;
    }
  },

  /**
   * Update user points
   * @param {string} userId 
   * @param {number} points 
   * @returns {Promise<Object>}
   */
  async updatePoints(userId, points) {
    try {
      const { data, error } = await supabase
        .from('user_points')
        .update({ points })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating points:', error);
      throw error;
    }
  },

  /**
   * Add points to user account
   * @param {string} userId 
   * @param {number} pointsToAdd 
   * @param {string} reason 
   * @returns {Promise<Object>}
   */
  async addPoints(userId, pointsToAdd, reason) {
    try {
      const currentPoints = await this.getUserPoints(userId);
      const newPoints = currentPoints.points + pointsToAdd;

      // Update points
      await this.updatePoints(userId, newPoints);

      // Log transaction
      const { error: logError } = await supabase
        .from('points_transactions')
        .insert({
          user_id: userId,
          points: pointsToAdd,
          type: 'earned',
          reason,
        });

      if (logError) throw logError;

      return { success: true, newPoints };
    } catch (error) {
      console.error('Error adding points:', error);
      throw error;
    }
  },
};