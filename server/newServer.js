const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const dbController = require("./controllers/dbController");
const authController = require("./controllers/authController");
const ioController = require("./controllers/ioController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  return next();
});

//  Route to register
//  get hash pw, select user from db, if no user exists insert new user, then jwt sign and cookie, endpoint
app.post('/register', 
  authController.hashPwd, 
  dbController.getUserByName, 
  dbController.insertNewUser, 
  authController.verifyUser, 
  (req, res) => {
    console.log("Register request has reached the last piece of middleware")
    res.status(200).json({ 
      authorized : true,
      message: "successful register" 
    });
  }
)
//  Route to login
app.post("/login", 
dbController.getUserByName, 
authController.verifyUser, 
(req, res) => {
  console.log("login successful")
    res.status(200).json({
      authorized : true, 
      message: "successful login" });
  }
)
//  Route to get markets
app.get("/getmarkets", 
authController.isAuthorized,
ioController.openSocket,
dbController.getMarkets, 
ioController.emitUpdate, 
(req, res,) => {
  return res.status(200).send(res.locals.rows);
  }
)
//  Route to add market
app.post("/addmarket", 
authController.isAuthorized,
dbController.insertMarket,
(req, res) => {
  return res.redirect(301, "/getmarkets")
})
//  Route to make a bid
app.post("/makebid",
authController.isAuthorized,
authController.verifyUserId,
dbController.insertBid,
(req, res) => {
  return res.redirect("/getmarkets");
  }
)
//  Intial route to serve up index.html (may be unesscary)
/* app.get("/", (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
}); */

//  Global error handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.status(418).send({ error: err });
});

//  start up on http://localhost:3000
http.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
