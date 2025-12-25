import React, { createContext, useContext, useState } from 'react';

const RewardsContext = createContext(null);

export const RewardsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('earn');
  const [rewardFilter, setRewardFilter] = useState('all');

  const value = {
    activeTab,
    setActiveTab,
    rewardFilter,
    setRewardFilter,
  };

  return (
    <RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewardsContext = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewardsContext must be used within RewardsProvider');
  }
  return context;
};
