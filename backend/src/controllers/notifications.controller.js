const notificationModel = require("../models/notification.model");

const getMyNotifications = async (req, res) => {
  const notifications = await notificationModel.getUserNotifications(req.user.id);
  res.json(notifications);
};

module.exports = { getMyNotifications };
