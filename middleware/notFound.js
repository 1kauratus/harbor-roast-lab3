/**
 * Catch-all for unknown routes. Forwards a 404 into the error handler.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export default notFound;
