const express = require("express");
const router = express.Router();

const getMyNotifications = require("../controllers/notifications.controller");
const authenticate = require("../middleware/auth.middleware");


router.get(
  "/notifications",
  authenticate,
  getMyNotifications
);