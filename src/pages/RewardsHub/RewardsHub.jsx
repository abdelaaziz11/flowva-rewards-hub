import React, { useState, useEffect } from "react";
import { Sidebar, Header } from "../../components/Layout";
import { NotificationPanel } from "../../components/Notifications";
import { LoadingSpinner } from "../../components/Common";
import EarnPointsTab from "./EarnPointsTab";
import RedeemRewardsTab from "./RedeemRewardsTab";
import { useAuthContext } from "../../context/AuthContext";
import { useRewardsContext } from "../../context/RewardsContext";
import { usePoints } from "../../hooks/usePoints";
import { useRewards } from "../../hooks/useRewards";
import { useNotifications } from "../../hooks/useNotifications";
import { TABS } from "../../utils/constants";
//import TestLogin from '../../components/Auth/TestLogin';

const RewardsHub = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { activeTab, setActiveTab, rewardFilter, setRewardFilter } =
    useRewardsContext();
  const [activePage, setActivePage] = useState("rewards");
  const [showNotifications, setShowNotifications] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [redeemLoading, setRedeemLoading] = useState(false);
  //const [showLogin, setShowLogin] = useState(false);

  // Custom hooks for data
  const {
    points,
    streak,
    loading: pointsLoading,
    claimDaily,
    refreshPoints,
  } = usePoints(user?.id);

  const {
    rewards,
    loading: rewardsLoading,
    // eslint-disable-next-line no-unused-vars
    redeemReward,
    refreshRewards,
  } = useRewards(user?.id);

  const {
    notifications,
    //loading: notifLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAll,
  } = useNotifications(user?.id);

  useEffect(() => {
    console.log("🔔 Notifications data:", notifications);
    console.log("🔔 Notifications count:", notifications.length);
    console.log("🔔 User ID:", user?.id);

  //   if (!user) {
  //   setShowLogin(true);
  // } else {
  //   setShowLogin(false);
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, user]);

  const hasUnreadNotifications = notifications.some((n) => !n.read);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const loading = authLoading || pointsLoading || rewardsLoading;

  // Mock referral stats - replace with actual data from Supabase
  const referralStats = {
    count: 0,
    pointsEarned: 0,
  };

  const handleClaimDaily = async () => {
    try {
      setClaimLoading(true);
      await claimDaily();
      // Show success notification
      alert("Daily points claimed successfully!");
    } catch (error) {
      console.error("Error claiming daily points:", error);
      alert(error.message || "Failed to claim points. Please try again.");
    } finally {
      setClaimLoading(false);
    }
  };

  const handleRedeemReward = async (reward) => {
    if (!window.confirm(`Redeem ${reward.name} for ${reward.cost} points?`)) {
      return;
    }

    try {
      setRedeemLoading(true);
      alert("Reward redeemed successfully! You will receive it shortly.");
      await refreshPoints();
      await refreshRewards();
    } catch (error) {
      console.error("Error redeeming reward:", error);
      alert(error.message || "Failed to redeem reward. Please try again.");
    } finally {
      setRedeemLoading(false);
    }
  };

  //const hasUnreadNotifications = notifications.some((n) => !n.read);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <LoadingSpinner size="lg" message="Loading rewards..." />
      </div>
    );
  }
//   if (showLogin) {
//   return <TestLogin onLoginSuccess={() => window.location.reload()} />;
// }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        user={user}
      />

      <div className="ml-64 flex-1">
        <Header
          title="Rewards Hub"
          subtitle="Earn points, unlock rewards, and celebrate your progress!"
          onNotificationClick={() => setShowNotifications(!showNotifications)}
          hasUnread={hasUnreadNotifications}
          unreadCount={unreadCount}
        />

        {showNotifications && (
          <NotificationPanel
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onDelete={deleteNotification}
            onDeleteAll={deleteAll}
            onClose={() => setShowNotifications(false)}
          />
        )}

        <main className="p-8">
          {/* Tab Navigation */}
          <div className="flex gap-8 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab(TABS.EARN)}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === TABS.EARN
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Earn Points
              {activeTab === TABS.EARN && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab(TABS.REDEEM)}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === TABS.REDEEM
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Redeem Rewards
              {activeTab === TABS.REDEEM && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === TABS.EARN && (
            <EarnPointsTab
              points={points}
              streak={streak}
              userId={user?.id}
              onClaimDaily={handleClaimDaily}
              claimLoading={claimLoading}
              referralStats={referralStats}
            />
          )}

          {activeTab === TABS.REDEEM && (
            <RedeemRewardsTab
              rewards={rewards}
              userPoints={points}
              rewardFilter={rewardFilter}
              setRewardFilter={setRewardFilter}
              onRedeemReward={handleRedeemReward}
              redeemLoading={redeemLoading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default RewardsHub;
