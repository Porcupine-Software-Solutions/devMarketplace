/** 
 * @name authController.js
 * @description Middleware functions for hashing password and verifying user data
 * @hashPwd uses bcrypt to store a hashed password in res.locals after a user registered
 * @verifyUser verifies password and then instantiates cookies with jots for successful signin
 * @verifyUserId verifies that the user has login credentials
 * @isAuthorized uses jwts to verify the user's credentials before they are able to post
*/


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "aksdjhfwqeirouywqoieruydnbmzxc";

const authController = {};

authController.hashPwd = (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  res.locals.hashedPwd = bcrypt.hashSync(password, salt);
  return next();
};

authController.verifyUser = (req, res, next) => {
  console.log("arrived at verifyUser")
  if (!res.locals.user) {
    return next("invalid username/password");
  }
  const dbPwd = res.locals.user.password;
  const valid = bcrypt.compareSync(req.body.password, dbPwd);
  if (valid) {
    let useridJWT = jwt.sign({ user_id: res.locals.user.user_id }, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 12
    });
    res.cookie("user_id", useridJWT, { maxAge: 43200000, httpOnly: true });

    let usernameJWT = jwt.sign({ username: res.locals.user.username }, secret, {
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
  else {
    return res.status(418).send({ message: "invalid username/password" });
  }
};

authController.verifyUserId = (req, res, next) => {
  let user_id = req.cookies.user_id;
  user_id = jwt.verify(user_id, secret, { algorithm: "HS256" }).user_id;
  res.locals.user_id = user_id;
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

module.exports = authController;