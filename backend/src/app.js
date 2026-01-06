const express = require("express");
const cors = require("cors");
const { connectRedis } = require("./config/redis");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

const startApp = async () => {
  await connectRedis();
};

startApp();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);



app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;

