const userService = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const assignUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    await userService.assignRole(userId, role);
    res.json({ message: "Role assigned successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  assignUserRole
};