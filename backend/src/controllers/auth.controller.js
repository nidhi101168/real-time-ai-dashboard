const { runInBackground } = require("../utils/backgroundTask");
const authService = require("../services/auth.service");
const analyticsService = require("../services/analytics.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await authService.registerUser(name, email, password);

    runInBackground(() =>
      analyticsService.trackEvent(
        newUser,
        "USER_REGISTERED",
        { role: "user" }
      )
    );

    res.status(201).json({ message: "User registered", userId: newUser.id});

  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {user ,token} = await authService.loginUser(email, password);

    runInBackground(() =>
      analyticsService.trackEvent(
        user,
        "USER_LOGIN",
        { email }
      )
    );

    res.json({ accessToken: token });


  } catch (err) {
    res.status(401).json({ error: err.message });
  }


};

module.exports = {
  register,
  login
};
