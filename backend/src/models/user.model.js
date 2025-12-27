const pool = require("../config/db");

const createUser = async (name, email, passwordHash) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

const getUserRoles = async (userId) => {
  const [rows] = await pool.query(
    `SELECT r.name 
     FROM roles r
     JOIN user_roles ur ON ur.role_id = r.id
     WHERE ur.user_id = ?`,
    [userId]
  );
  return rows.map(r => r.name);
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserRoles
};
