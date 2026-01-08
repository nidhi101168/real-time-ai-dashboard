const { Server } = require("socket.io");
const socketAuthMiddleware = require("./auth.socket");

let io;
  const onlineUsers = new Map();
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // 🔐 Attach auth middleware
  io.use(socketAuthMiddleware);



  io.on("connection", (socket) => {
  const userId = socket.user.id;

  onlineUsers.set(userId, socket.id);

  console.log(`🟢 User online: ${userId}`);

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    console.log(`🔴 User offline: ${userId}`);
  });
});
};

const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

module.exports = { initSocket, getIO, onlineUsers};
