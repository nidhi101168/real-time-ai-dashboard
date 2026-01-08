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

const getAllUsers = async () => {
  const [rows] = await pool.query(
    "SELECT id, name, email, is_active, created_at FROM users"
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.email, r.name AS role
     FROM users u
     JOIN user_roles ur ON u.id = ur.user_id
     JOIN roles r ON ur.role_id = r.id
     WHERE u.id = ?`,
    [id]
  );
  return rows[0];
};




const assignRoleToUser = async (userId, roleName) => {
  const [role] = await pool.query(
    "SELECT id FROM roles WHERE name = ?",
    [roleName]
  );

  if (role.length === 0) {
    throw new Error("Role does not exist");
  }

  await pool.query(
    "INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)",
    [userId, role[0].id]
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserRoles,
  getAllUsers,
  findById,
  assignRoleToUser,
};
