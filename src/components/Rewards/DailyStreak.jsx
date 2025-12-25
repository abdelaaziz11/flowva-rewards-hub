import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
//import { getDayInitial } from '../../utils/helpers';

const DailyStreak = ({ streak, onClaim, loading = false }) => {
  const [claimed, setClaimed] = useState(false);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const currentDayIndex = new Date().getDay();
  const adjustedIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  const handleClaim = async () => {
    try {
      await onClaim();
      setClaimed(true);
    } catch (error) {
      // Error handled in parent
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Calendar className="text-blue-600" size={20} />
        </div>
        <h3 className="font-semibold text-gray-700">Daily Streak</h3>
      </div>
      
      <div className="text-center mb-4">
        <span className="text-5xl font-bold text-purple-600">
          {streak} day{streak !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="flex justify-center gap-2 mb-4">
        {days.map((day, i) => (
          <div
            key={i}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              i === adjustedIndex
                ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                : i < streak 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-600 text-center mb-4">
        Check in daily to earn +5 points
      </p>
      
      <button
        onClick={handleClaim}
        disabled={loading || claimed}
        className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
          claimed
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-md'
        }`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Claiming...
          </>
        ) : claimed ? (
          <>⚡ Claimed Today</>
        ) : (
          <>⚡ Claim Today's Points</>
        )}
      </button>
    </div>
  );
};

export default DailyStreak;
