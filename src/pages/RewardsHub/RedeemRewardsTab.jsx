import React from "react";
import { Gift } from "lucide-react";
import { RewardCard } from "../../components/Rewards";
import { REWARD_FILTERS } from "../../utils/constants";

const RedeemRewardsTab = ({
  rewards,
  userPoints,
  rewardFilter,
  setRewardFilter,
  onRedeemReward,
  redeemLoading,
}) => {
  const filterOptions = [
    { key: REWARD_FILTERS.ALL, label: "All Rewards", count: rewards.length },
    {
      key: REWARD_FILTERS.UNLOCKED,
      label: "Unlocked",
      count: rewards.filter((r) => userPoints >= r.cost).length,
    },
    {
      key: REWARD_FILTERS.LOCKED,
      label: "Locked",
      count: rewards.filter((r) => userPoints < r.cost).length,
    },
    { key: REWARD_FILTERS.COMING_SOON, label: "Coming Soon", count: 0 },
  ];

  const getFilteredRewards = () => {
    if (rewardFilter === REWARD_FILTERS.ALL) return rewards;
    if (rewardFilter === REWARD_FILTERS.UNLOCKED)
      return rewards.filter((r) => userPoints >= r.cost);
    if (rewardFilter === REWARD_FILTERS.LOCKED)
      return rewards.filter((r) => userPoints < r.cost);
    if (rewardFilter === REWARD_FILTERS.COMING_SOON) return [];
    return rewards;
  };

  const filteredRewards = getFilteredRewards();

  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">
        Redeem Your Points
      </h2>

      <div className="flex items-center gap-10 mb-6 border-b border-gray-200">
        {filterOptions.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setRewardFilter(filter.key)}
            className={`relative flex items-center gap-2 px-5 py-2 font-semibold transition-colors
              ${
                rewardFilter === filter.key
                  ? "text-purple-600 bg-purple-50 rounded-lg"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
            >
            {filter.label}{" "}
            <span className={`ml-1 px-2 py-0.5 text-xs font-semibold rounded-full
              ${
                rewardFilter === filter.key
                  ? 'text-purple-600 bg-purple-100'
                  : 'text-gray-500 bg-gray-200'
              }
            `}>{filter.count}</span>
            {rewardFilter === filter.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
        ))}
      </div>

      {filteredRewards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={userPoints}
              onRedeem={onRedeemReward}
              loading={redeemLoading}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-500">No rewards in this category yet</p>
        </div>
      )}
    </>
  );
};

export default RedeemRewardsTab;
