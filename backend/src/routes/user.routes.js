const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const userController = require("../controllers/user.controller");

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  userController.getUsers
);

router.post(
  "/assign-role",
  authenticate,
  authorize(["admin"]),
  userController.assignUserRole
);

module.exports = router;
