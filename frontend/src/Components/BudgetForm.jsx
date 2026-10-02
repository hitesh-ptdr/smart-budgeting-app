// src/components/BudgetForm.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function BudgetForm({ addTransaction, categories = [], addCategory }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Other');
  const [note, setNote] = useState('');
  const [newCat, setNewCat] = useState('');
  const [showNewCat, setShowNewCat] = useState(false);

  // keep local category in sync if categories prop changes
  useEffect(() => {
    if (!categories.includes(category)) {
      setCategory(categories[0] || 'Other');
    }
  }, [categories]);

  const onSubmit = (e) => {
    e.preventDefault();
    const amt = Number(amount || 0);
    if (!amt || amt <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    if (!category || category.trim() === '') {
      toast.error('Select or add a category');
      return;
    }
    addTransaction({
      type,
      amount: amt,
      category,
      note: note.trim(),
    });
    // reset fields lightly
    setAmount('');
    setNote('');
    setType('expense');
    setCategory(categories[0] || 'Other');
  };

  const handleAddCategory = () => {
    const c = (newCat || '').trim();
    if (!c) { toast.info('Type category name'); return; }
    if (categories.includes(c)) { toast.info('Category exists'); setNewCat(''); setShowNewCat(false); return; }
    addCategory(c);
    setCategory(c);
    setNewCat('');
    setShowNewCat(false);
    toast.success(`Category "${c}" added`);
  };

  return (
    <form onSubmit={onSubmit} className="budget-form-compact">
      <div className="row gx-2">
        <div className="col-5">
          <select value={type} onChange={(e) => setType(e.target.value)} className="form-control form-control-sm">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="col-7">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control form-control-sm"
            placeholder="Amount"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="row gx-2 mt-2 align-items-center">
        <div className="col-md-7 col-12">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control form-control-sm"
            aria-label="Category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="__add_new__">+ Add new category...</option>
          </select>
        </div>

        <div className="col-md-5 col-12 text-end">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShowNewCat((s) => !s)}
            title="Add new category inline"
          >
            {showNewCat ? 'Cancel' : 'New Category'}
          </button>
        </div>
      </div>

      {showNewCat && (
        <div className="row gx-2 mt-2">
          <div className="col-8">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Type new category (e.g., Groceries)"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
            />
          </div>
          <div className="col-4 text-end">
            <button type="button" className="btn btn-sm btn-primary" onClick={handleAddCategory}>Add</button>
          </div>
        </div>
      )}

      <div className="row gx-2 mt-2">
        <div className="col-12">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-control form-control-sm"
            placeholder="Note (optional)"
          />
        </div>
      </div>

      <div className="row gx-2 mt-3">
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    </form>
  );
}
