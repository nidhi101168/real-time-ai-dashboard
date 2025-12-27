const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.get(
  "/dashboard",
  authenticate,
  authorize(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard"})
  }
);

module.exports = router;

