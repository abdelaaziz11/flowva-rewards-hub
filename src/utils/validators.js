/**
 * Flowva Rewards Hub - Validation Utilities
 * Complete validation functions for user inputs
 */

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password 
 * @returns {Object} { isValid, errors, strength }
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character');
  }
  
  // Calculate strength
  let strength = 0;
  if (password.length >= minLength) strength++;
  if (hasUpperCase) strength++;
  if (hasLowerCase) strength++;
  if (hasNumbers) strength++;
  if (hasSpecialChar) strength++;
  
  const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: strengthLevels[strength] || 'Very Weak',
    score: strength,
  };
};

/**
 * Validate username
 * @param {string} username 
 * @returns {Object}
 */
export const validateUsername = (username) => {
  const errors = [];
  const minLength = 3;
  const maxLength = 20;
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  
  if (!username || username.trim().length === 0) {
    errors.push('Username is required');
  } else if (username.length < minLength) {
    errors.push(`Username must be at least ${minLength} characters long`);
  } else if (username.length > maxLength) {
    errors.push(`Username must be no more than ${maxLength} characters long`);
  } else if (!usernameRegex.test(username)) {
    errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate points amount
 * @param {number} points 
 * @returns {Object}
 */
export const validatePoints = (points) => {
  const errors = [];
  
  if (typeof points !== 'number') {
    errors.push('Points must be a number');
  } else if (points < 0) {
    errors.push('Points cannot be negative');
  } else if (!Number.isInteger(points)) {
    errors.push('Points must be a whole number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate reward redemption
 * @param {number} userPoints Current user points
 * @param {number} rewardCost Cost of reward
 * @returns {Object}
 */
export const validateRedemption = (userPoints, rewardCost) => {
  const errors = [];
  
  if (typeof userPoints !== 'number' || typeof rewardCost !== 'number') {
    errors.push('Invalid points or cost value');
  } else if (userPoints < rewardCost) {
    errors.push(`Insufficient points. You need ${rewardCost - userPoints} more points.`);
  } else if (rewardCost <= 0) {
    errors.push('Invalid reward cost');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    canRedeem: userPoints >= rewardCost,
  };
};

/**
 * Validate referral code
 * @param {string} code 
 * @returns {Object}
 */
export const validateReferralCode = (code) => {
  const errors = [];
  const codeRegex = /^[a-zA-Z0-9]{6,12}$/;
  
  if (!code || code.trim().length === 0) {
    errors.push('Referral code is required');
  } else if (!codeRegex.test(code)) {
    errors.push('Invalid referral code format');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate notification message
 * @param {string} message 
 * @returns {Object}
 */
export const validateNotificationMessage = (message) => {
  const errors = [];
  const maxLength = 500;
  
  if (!message || message.trim().length === 0) {
    errors.push('Message cannot be empty');
  } else if (message.length > maxLength) {
    errors.push(`Message must be no more than ${maxLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate reward name
 * @param {string} name 
 * @returns {Object}
 */
export const validateRewardName = (name) => {
  const errors = [];
  const minLength = 3;
  const maxLength = 100;
  
  if (!name || name.trim().length === 0) {
    errors.push('Reward name is required');
  } else if (name.length < minLength) {
    errors.push(`Reward name must be at least ${minLength} characters`);
  } else if (name.length > maxLength) {
    errors.push(`Reward name must be no more than ${maxLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate reward description
 * @param {string} description 
 * @returns {Object}
 */
export const validateRewardDescription = (description) => {
  const errors = [];
  const maxLength = 1000;
  
  if (description && description.length > maxLength) {
    errors.push(`Description must be no more than ${maxLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate phone number (international format)
 * @param {string} phone 
 * @returns {Object}
 */
export const validatePhoneNumber = (phone) => {
  const errors = [];
  // Basic international phone validation (supports +, digits, spaces, hyphens)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  
  // Remove spaces and hyphens for validation
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  if (!phone || phone.trim().length === 0) {
    errors.push('Phone number is required');
  } else if (!phoneRegex.test(cleanPhone)) {
    errors.push('Invalid phone number format');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate date range
 * @param {Date|string} startDate 
 * @param {Date|string} endDate 
 * @returns {Object}
 */
export const validateDateRange = (startDate, endDate) => {
  const errors = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime())) {
    errors.push('Invalid start date');
  }
  if (isNaN(end.getTime())) {
    errors.push('Invalid end date');
  }
  if (start > end) {
    errors.push('Start date must be before end date');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate URL format
 * @param {string} url 
 * @returns {Object}
 */
export const validateURL = (url) => {
  const errors = [];
  
  try {
    new URL(url);
  } catch (e) {
    errors.push('Invalid URL format');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize user input (remove dangerous characters)
 * @param {string} input 
 * @returns {string}
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

/**
 * Validate form data
 * @param {Object} formData 
 * @param {Object} rules Validation rules
 * @returns {Object}
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = formData[field];
    
    // Required validation
    if (rule.required && (!value || value.toString().trim().length === 0)) {
      errors[field] = rule.message || `${field} is required`;
      return;
    }
    
    // Min length validation
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
      return;
    }
    
    // Max length validation
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = rule.message || `${field} must be no more than ${rule.maxLength} characters`;
      return;
    }
    
    // Pattern validation
    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} format is invalid`;
      return;
    }
    
    // Custom validation function
    if (rule.validate && value) {
      const customError = rule.validate(value);
      if (customError) {
        errors[field] = customError;
        return;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate reward cost
 * @param {number} cost 
 * @returns {Object}
 */
export const validateRewardCost = (cost) => {
  const errors = [];
  const minCost = 1;
  const maxCost = 1000000;
  
  if (typeof cost !== 'number') {
    errors.push('Cost must be a number');
  } else if (cost < minCost) {
    errors.push(`Cost must be at least ${minCost}`);
  } else if (cost > maxCost) {
    errors.push(`Cost cannot exceed ${maxCost}`);
  } else if (!Number.isInteger(cost)) {
    errors.push('Cost must be a whole number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if value is empty
 * @param {any} value 
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Validate streak count
 * @param {number} streak 
 * @returns {Object}
 */
export const validateStreak = (streak) => {
  const errors = [];
  const maxStreak = 10000; // Reasonable max
  
  if (typeof streak !== 'number') {
    errors.push('Streak must be a number');
  } else if (streak < 0) {
    errors.push('Streak cannot be negative');
  } else if (streak > maxStreak) {
    errors.push(`Streak cannot exceed ${maxStreak}`);
  } else if (!Number.isInteger(streak)) {
    errors.push('Streak must be a whole number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default {
  isValidEmail,
  validatePassword,
  validateUsername,
  validatePoints,
  validateRedemption,
  validateReferralCode,
  validateNotificationMessage,
  validateRewardName,
  validateRewardDescription,
  validatePhoneNumber,
  validateDateRange,
  validateURL,
  sanitizeInput,
  validateForm,
  validateRewardCost,
  isEmpty,
  validateStreak,
};