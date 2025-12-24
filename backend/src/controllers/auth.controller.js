const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = await authService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered", userId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ accessToken: token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};
