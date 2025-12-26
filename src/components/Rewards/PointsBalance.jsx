import React from 'react';
import { Award } from 'lucide-react';
import { formatPoints, calculateProgress } from '../../utils/helpers';

const PointsBalance = ({ points, targetPoints = 5000 }) => {
  const progress = calculateProgress(points, targetPoints);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-purple-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Award className="text-purple-600" size={20} />
        </div>
        <h3 className="font-semibold text-gray-700">Points Balance</h3>
      </div>
      
      <div className="flex items-end gap-2 mb-3">
        <span className="text-5xl font-bold text-purple-600">{formatPoints(points)}</span>
        <span className="text-yellow-500 text-3xl mb-2">⭐</span>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Progress to $5 Gift Card</span>
        <span className="font-semibold text-gray-900">{points}/{targetPoints}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
        <div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
        🚀 Just getting started — keep earning points!
      </p>
    </div>
  );
};

export default PointsBalance;
