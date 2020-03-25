const ioController = {};

ioController.openSocket = () => {
  req.io.on("connection", socket => {
    console.log("socket here");
    socket.join("secret-market");
  });
};

module.exports = ioController;
