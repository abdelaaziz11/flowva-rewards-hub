import React from 'react';
import { Star, Share2 } from 'lucide-react';

const EarnMorePoints = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">
        Earn More Points
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-purple-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Refer and win 10,000 points!</h3>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of{' '}
            <span className="font-semibold text-purple-600">10,000 points</span>. Friends must complete onboarding to qualify.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-purple-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Share2 className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Share Your Stack</h3>
                <p className="text-sm text-gray-600">Earn +25 pts</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Share your tool stack</p>
          <button className="bg-white hover:bg-gray-50 border-2 border-purple-200 hover:border-purple-300 text-purple-600 font-semibold py-2 px-4 rounded-lg transition-all flex items-center gap-2">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>
    </>
  );
};

export default EarnMorePoints;