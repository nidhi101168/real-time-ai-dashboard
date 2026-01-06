const analyticsModel = require("../models/analytics.model");

const trackEvent = async (user, eventType, metadata = {}) => {
  if (!user?.id) return; // guard clause

  await analyticsModel.logEvent({
    userId: user.id,
    eventType,
    metadata
  });
};

const getEventStats = async () => {
  return await analyticsModel.getEventCounts();
};

const getLoginTrends = async (days) => {
  return await analyticsModel.getDailyLoginTrends(days);
};

const getActiveUsers = async (limit) => {
  return await analyticsModel.getMostActiveUsers(limit);
};

const getEventsByRole = async () => {
  return await analyticsModel.getEventsByRole();
};




module.exports = { 
  trackEvent , 
  getEventStats, 
  getLoginTrends, 
  getActiveUsers,
  getEventsByRole
};
