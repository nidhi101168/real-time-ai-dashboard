const pool = require("../config/db");

const logEvent = async ({ userId, eventType, metadata }) => {
  await pool.query(
    `INSERT INTO analytics_logs (user_id, event_type, metadata)
     VALUES (?, ?, ?)`,
    [userId || null, eventType, JSON.stringify(metadata || {})]
  );
};

const getEventCounts = async () => {
  const [rows] = await pool.query(`
    SELECT 
      event_type,
      COUNT(*) AS total
    FROM analytics_logs
    GROUP BY event_type
  `);

  return rows;
};

const getDailyLoginTrends = async (days = 7) => {
  const [rows] = await pool.query(
    `
    SELECT 
      DATE(created_at) AS date,
      COUNT(*) AS logins
    FROM analytics_logs
    WHERE event_type = 'USER_LOGIN'
      AND created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at) ASC
    `,
    [days]
  );

  return rows;
};

const getMostActiveUsers = async (limit = 10) => {
  const [rows] = await pool.query(
    `
    SELECT 
      u.id AS userId,
      u.email,
      COUNT(a.id) AS events
    FROM analytics_logs a
    JOIN users u ON a.user_id = u.id
    GROUP BY a.user_id
    ORDER BY events DESC
    LIMIT ?
    `,
    [limit]
  );

  return rows;
};

const getEventsByRole = async () => {
  const [rows] = await pool.query(`
    SELECT 
      r.name AS role,
      COUNT(a.id) AS events
    FROM analytics_logs a
    JOIN users u ON a.user_id = u.id
    JOIN user_roles ur ON u.id = ur.user_id
    JOIN roles r ON ur.role_id = r.id
    GROUP BY r.name
    ORDER BY events DESC
  `);

  return rows;
};




module.exports = {
  logEvent,
  getEventCounts,
  getDailyLoginTrends,
  getMostActiveUsers,
  getEventsByRole
};