require("dotenv").config({ path: "./.env" });
const http = require("http");
const app = require("./src/app");
const { initSocket } = require("./src/sockets");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

    await pool.query("SELECT 1");
    console.log("✅ MySQL connected");

    // app.listen(PORT, () => {
    //   console.log(`🚀 Server running on port ${PORT}`);
    // });

    const server = http.createServer(app);

// Initialize socket.io
    initSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
  }
})();
