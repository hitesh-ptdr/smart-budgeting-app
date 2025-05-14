const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Add new transaction
router.post("/add", async (req, res) => {
  try {
    const { title, amount, type, userId } = req.body;

    const transaction = new Transaction({ title, amount, type, userId });
    await transaction.save();

    res.status(201).json({ message: "Transaction added", transaction });
  } catch (err) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// Get all transactions of a user
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

module.exports = router;
