const bcrypt = require("bcryptjs");

const authController = {};

authController.hashPwd = (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  req.locals.hashedPwd = bcrypt.hashSync(password, salt);
};

authController.verifyUser = (req, res, next) => {
  if (!res.locals.user) {
    return next("invalid username/password");
  }
  let dbPwd = res.locals.user.password;
  const valid = bcrypt.compareSync(password, dbPwd);
  if (valid) {
    let useridJWT = jwt.sign({ user_id: res.locals.user.user_id }, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 12
    });
    res.cookie("user_id", useridJWT, { maxAge: 43200000, httpOnly: true });
    let usernameJWT = jwt.sign({ username: username }, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 12
    });
    res.cookie("username", usernameJWT, {
      maxAge: 43200000,
      httpOnly: true
    });
    let authorizedJWT = jwt.sign({ authorized: true }, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 12
    });
    res.cookie("authorized", authorizedJWT, {
      maxAge: 43200000,
      httpOnly: true
    });
    return next();
  }
};

authController.verifyUserId = (req, res, next) => {
  let user_id = req.cookies.user_id;
  user_id = jwt.verify(user_id, secret, { algorithm: "HS256" }).user_id;
  res.locals.userId = user_id;
  return next();
};

authController.isAuthorized = (req, res, next) => {
  //authorization middleware
  if (req.cookies.authorized) {
    let authorized = jwt.verify(req.cookies.authorized, secret, {
      algorithm: "HS256"
    }).authorized;
    if (authorized) {
      return next();
    } else {
      return next("unauthorized access");
    }
  }
  return next("no cookies");
};
