const express = require("express");
const router = express.Router();
const { setBudget, getBudget } = require("../controllers/budgetController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, setBudget); // POST /api/budget
router.get("/:month", protect, getBudget); // GET /api/budget/May

module.exports = router;
