/**
 * @name ioController.js
 * @description Middleware to handle socket.io functionality
 * @openSocket instantiates the connection;
 * @emitUpdate sends updated server data to client-side
 */
const ioController = {};

ioController.openSocket = (req, res,next) => {
  req.io.on("connection", socket => {
    console.log("socket here");
    socket.join("secret-market");
    return next();
  });
};

ioController.emitUpdate = (req, res, next) => {
  req.io.to("secret-market").emit("update", res.locals.rows);
  return next()
}

module.exports = ioController;
