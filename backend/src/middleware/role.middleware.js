const userModel = require("../models/user.model");

const authorize = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const roles = await userModel.getUserRoles(req.user.id);

      const hasAccess = roles.some(role =>
        allowedRoles.includes(role)
      );

      if (!hasAccess) {
        return res.status(403).json({ error: "Access denied" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ error: "Authorization failed" });
    }
  };
};

module.exports = authorize;
