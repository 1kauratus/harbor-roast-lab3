/**
 * Validates POST /api/items bodies.
 * Required fields: name, category, price, caffeineMg, available
 */
const validateItem = (req, res, next) => {
  const { name, category, price, caffeineMg, available, description } = req.body ?? {};
  const errors = [];

  if (typeof name !== "string" || name.trim() === "") {
    errors.push("name must be a non-empty string");
  }

  if (typeof category !== "string" || category.trim() === "") {
    errors.push("category must be a non-empty string");
  }

  if (typeof price !== "number" || Number.isNaN(price) || price < 0) {
    errors.push("price must be a valid number greater than or equal to 0");
  }

  if (typeof caffeineMg !== "number" || Number.isNaN(caffeineMg) || caffeineMg < 0) {
    errors.push("caffeineMg must be a valid number greater than or equal to 0");
  }

  if (typeof available !== "boolean") {
    errors.push("available must be a boolean");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string when provided");
  }

  if (errors.length > 0) {
    const error = new Error("Invalid menu item payload");
    error.status = 400;
    error.details = errors;
    return next(error);
  }

  return next();
};

export default validateItem;
