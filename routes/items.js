import { Router } from "express";
import {
  createItem,
  deleteItemById,
  getAllItems,
  getItemById
} from "../data/items.js";
import validateItem from "../middleware/validateItem.js";

const router = Router();

const parseId = (rawId) => {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Item id must be a positive integer");
    error.status = 400;
    throw error;
  }
  return id;
};

// GET /api/items — all menu items
router.get("/", (req, res) => {
  res.status(200).json({
    count: getAllItems().length,
    items: getAllItems()
  });
});

// GET /api/items/:id — one menu item
router.get("/:id", (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const item = getItemById(id);

    if (!item) {
      const error = new Error(`No menu item found with id ${id}`);
      error.status = 404;
      throw error;
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

// POST /api/items — create a menu item
router.post("/", validateItem, (req, res, next) => {
  try {
    const item = createItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/items/:id — remove a menu item
router.delete("/:id", (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const removed = deleteItemById(id);

    if (!removed) {
      const error = new Error(`No menu item found with id ${id}`);
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Menu item deleted",
      item: removed
    });
  } catch (error) {
    next(error);
  }
});

export default router;
