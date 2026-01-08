const pool = require("../config/db");

const createNotification = async ({ userId, type, message }) => {
  const [result] = await pool.query(
    `INSERT INTO notifications (user_id, type, message)
     VALUES (?, ?, ?)`,
    [userId, type, message]
  );

  return {
    id: result.insertId,
    userId,
    type,
    message,
  };
};

const getUserNotifications = async (userId, limit = 20) => {
  const [rows] = await pool.query(
    `SELECT * FROM notifications
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT ?`,
    [userId, limit]
  );
  return rows;
};

const markAsRead = async (notificationId, userId) => {
  await pool.query(
    `UPDATE notifications
     SET is_read = true
     WHERE id = ? AND user_id = ?`,
    [notificationId, userId]
  );
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
};
