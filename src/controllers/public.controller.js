const healthController = (req, res) => {
  res.status(200).send({
    message: "Service is running",
  });
};

module.exports = {
  healthController,
};
