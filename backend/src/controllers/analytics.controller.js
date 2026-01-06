const analyticsService = require("../services/analytics.service");
const { getCache, setCache } = require("../utils/cache");

const getEventStats = async (req, res) => {
  try {
    const stats = await analyticsService.getEventStats();
    return res.json(stats);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch analytics" });
  }
};

const getLoginTrends = async (req, res) => {
  try {
    const days = Number(req.query.days) || 7;

    const trends = await analyticsService.getLoginTrends(days);
    return res.json(trends);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch login trends" });
  }
};

const getActiveUsers = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const users = await analyticsService.getActiveUsers(limit);
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch active users" });
  }
};



const getRoleAnalytics = async (req, res) => {
  const cacheKey = "analytics:role_stats";

  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.json({
        source: "cache",
        data: cached
      });
    }

    const data = await analyticsService.getEventsByRole();

    await setCache(cacheKey, data, 120);

    return res.json({
      source: "db",
      data
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch role analytics" });
  }
};




module.exports = {
  getEventStats,
  getLoginTrends,
  getActiveUsers,
  getRoleAnalytics
};