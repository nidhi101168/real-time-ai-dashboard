const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.get(
  "/events",
  authenticate,
  authorize(["admin"]),
  analyticsController.getEventStats
);

router.get(
  "/logins/trends",
  authenticate,
  authorize(["admin"]),
  analyticsController.getLoginTrends
);

router.get(
  "/users/active",
  authenticate,
  authorize(["admin"]),
  analyticsController.getActiveUsers
);

router.get(
  "/roles",
  authenticate,
  authorize(["admin"]),
  analyticsController.getRoleAnalytics
);




module.exports = router;