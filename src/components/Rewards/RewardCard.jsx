import React from 'react';
import { Star } from 'lucide-react';

const RewardCard = ({ reward, userPoints, onRedeem, loading = false }) => {
  const canRedeem = userPoints >= reward.cost;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span className="text-3xl">{reward.icon}</span>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2">{reward.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{reward.description}</p>
        
        <div className="flex items-center gap-1 text-yellow-600 font-semibold mb-4">
          <Star size={16} fill="currentColor" />
          <span>{reward.cost} pts</span>
        </div>
        
        <button
          onClick={() => onRedeem(reward)}
          disabled={!canRedeem || loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            canRedeem && !loading
              ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-md transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              Redeeming...
            </div>
          ) : canRedeem ? (
            'Redeem'
          ) : (
            'Locked'
          )}
        </button>
      </div>
    </div>
  );
};

export default RewardCard;