const userModel = require("../models/user.model");

const listUsers = async () => {
  return await userModel.getAllUsers();
};

const assignRole = async (userId, roleName) => {
  await userModel.assignRoleToUser(userId, roleName);
};

module.exports = {
  listUsers,
  assignRole
};
