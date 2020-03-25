const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const dbController = require("./controllers/dbController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  return next();
});

//  Route to register

//  Route to login

//  Route to get markets

//  Route to add market

//  Route to make a bid

//  Intial route to serve up index.html (may be unesscary)
/* app.get("/", (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
}); */

//  Global error handler
app.use((err, req, res, next) => {
  return res.status(418).send({ error: err });
});

//  start up on http://localhost:3000
http.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
