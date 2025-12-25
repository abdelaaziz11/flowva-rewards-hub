import React from 'react';
import { 
  PointsBalance, 
  DailyStreak, 
  FeaturedTool, 
  ReferralSection,
  EarnMorePoints 
} from '../../components/Rewards';

const EarnPointsTab = ({ 
  points, 
  streak, 
  userId,
  onClaimDaily, 
  claimLoading,
  referralStats 
}) => {
  const featuredTool = {
    name: 'Reclaim',
    description: 'Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!',
    points: 50,
  };

  const handleToolSignUp = () => {
    window.open('https://reclaim.ai', '_blank');
  };

  const handleClaimToolPoints = () => {
    // Logic to claim points for signing up
    console.log('Claim tool points');
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">
        Your Rewards Journey
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <PointsBalance points={points} />
        <DailyStreak streak={streak} onClaim={onClaimDaily} loading={claimLoading} />
        <FeaturedTool 
          tool={featuredTool}
          onSignUp={handleToolSignUp}
          onClaimPoints={handleClaimToolPoints}
        />
      </div>

      <EarnMorePoints />

      <ReferralSection userId={userId} referralStats={referralStats} />
    </>
  );
};

export default EarnPointsTab;