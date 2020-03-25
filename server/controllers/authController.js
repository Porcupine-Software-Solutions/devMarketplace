const bcrypt = require("bcryptjs");

const authController = {};

authController.hashPwd = (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  req.locals.hashedPwd = bcrypt.hashSync(password, salt);
};
