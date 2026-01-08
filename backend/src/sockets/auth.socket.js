const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId);
    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = {
      id: user.userId,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};

module.exports = socketAuthMiddleware;
