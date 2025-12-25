import React from 'react';
import { Users, Gift } from 'lucide-react';

const FeaturedTool = ({ tool, onSignUp, onClaimPoints }) => {
  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-6 rounded-xl border border-purple-200 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-purple-300">
      <div className="absolute top-4 right-4">
        <span className="text-2xl">✨</span>
      </div>
      
      <div className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
        Featured
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">Top Tool Spotlight</h3>
      <p className="text-2xl font-bold text-gray-900 mb-3">{tool.name}</p>
      <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
      
      <div className="flex gap-2">
        <button 
          onClick={onSignUp}
          className="flex-1 bg-white hover:bg-gray-50 text-purple-600 font-semibold py-2.5 px-4 rounded-lg transition-all border-2 border-purple-200 hover:border-purple-300 flex items-center justify-center gap-2"
        >
          <Users size={16} />
          Sign up
        </button>
        <button 
          onClick={onClaimPoints}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2"
        >
          <Gift size={16} />
          Claim {tool.points} pts
        </button>
      </div>
    </div>
  );
};

export default FeaturedTool;
