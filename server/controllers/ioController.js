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
