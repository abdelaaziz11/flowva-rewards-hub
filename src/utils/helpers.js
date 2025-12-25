/**
 * Format points with comma separator
 * @param {number} points 
 * @returns {string}
 */
export const formatPoints = (points) => {
  return points.toLocaleString();
};

/**
 * Calculate progress percentage
 * @param {number} current 
 * @param {number} target 
 * @returns {number}
 */
export const calculateProgress = (current, target) => {
  return Math.min((current / target) * 100, 100);
};

/**
 * Get day initial (M, T, W, etc.)
 * @param {number} dayOffset 
 * @returns {string}
 */
export const getDayInitial = (dayOffset = 0) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();
  const targetDay = (today + dayOffset) % 7;
  return days[targetDay];
};

/**
 * Format time ago
 * @param {string} dateString 
 * @returns {string}
 */
export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return '1d ago';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

/**
 * Copy text to clipboard
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Generate referral link
 * @param {string} userId 
 * @returns {string}
 */
export const generateReferralLink = (userId) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://app.flowvahub.com';
  return `${baseUrl}/signup?ref=${userId}`;
};

/**
 * Truncate text
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};