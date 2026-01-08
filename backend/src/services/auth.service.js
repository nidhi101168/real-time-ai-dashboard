const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const notificationService = require("../services/notifications.service");
const { getIO } = require("../sockets");

const registerUser = async (name, email, password) => {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await userModel.createUser(name, email, passwordHash);
  const user = await userModel.findUserByEmail(email);

  return user;
};

const loginUser = async (email, password) => {
  const user = await userModel.findUserByEmail(email);
   await notificationService.sendNotification(getIO, {
   userId: user.id,
   type: "LOGIN",
   message: "New login detected on your account",
   });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {user, token};
};

module.exports = {
  registerUser,
  loginUser
};
