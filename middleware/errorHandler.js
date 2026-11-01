/**
 * Centralized error handler (four-parameter Express signature).
 * Maps faults to 400 / 404 / 500 and returns structured JSON.
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const payload = {
    error: true,
    status,
    message: err.message || "Internal Server Error"
  };

  if (err.details) {
    payload.details = err.details;
  }

  if (status >= 500) {
    console.error(`[ERROR] ${err.stack || err.message}`);
  }

  res.status(status).json(payload);
};

export default errorHandler;
