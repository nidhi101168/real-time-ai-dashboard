const { redisClient } = require("../config/redis");

const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

const setCache = async (key, value, ttl = 60) => {
  await redisClient.setEx(key, ttl, JSON.stringify(value));
};

module.exports = {
  getCache,
  setCache
};
