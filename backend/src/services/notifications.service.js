const notificationModel = require("../models/notification.model");
const {  onlineUsers } = require("../sockets");

const sendNotification = async (getIO, { userId, type, message }) => {
  // 1. Save to DB
  const notification = await notificationModel.createNotification({
    userId,
    type,
    message,
  });

  // 2. Emit if user is online
  const socketId = onlineUsers.get(userId);
  if (socketId) {
   getIO().to(socketId).emit("notification", payload);
  }

  return notification;
};

module.exports = {
  sendNotification,
};
