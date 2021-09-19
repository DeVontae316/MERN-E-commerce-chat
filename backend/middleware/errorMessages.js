const customError = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).send({
    error: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const custom404 = (req, res, next) => {
  const error = new Error(`Not found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  customError,
  custom404,
};
