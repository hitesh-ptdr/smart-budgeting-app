import React, { useState, useEffect, useMemo } from 'react';
import BudgetForm from '../components/BudgetForm';
import TransactionList from '../Components/TransactionList';
import SummaryCard from '../components/SummaryCard';
import { Container, Row, Col, Card, ProgressBar, Button, Alert, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import './Dashboard.css';

// Charts
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const PRESET_CATEGORIES = [
  'General',
  'Food',
  'Transport',
  'Shopping',
  'Rent',
  'Utilities',
  'Entertainment',
  'Health',
  'Education',
  'Other',
];

function formatCurrency(num) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : PRESET_CATEGORIES;
  });

  const [goalAmount, setGoalAmount] = useState(() => {
    const saved = localStorage.getItem('goalAmount');
    return saved ? Number(saved) : 2000;
  });

  // persist
  useEffect(() => localStorage.setItem('transactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('goalAmount', String(goalAmount)), [goalAmount]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...transaction,
      amount: Number(transaction.amount),
      review: false,
    };
    setTransactions((s) => [newTransaction, ...s]);
    toast.success('Transaction added');
  };

  const deleteTransaction = (id) => {
    Swal.fire({
      title: 'Delete transaction?',
      text: "This can't be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((res) => {
      if (res.isConfirmed) {
        setTransactions((s) => s.filter((t) => t.id !== id));
        toast.info('Transaction deleted');
      }
    });
  };

  const toggleReview = (id) => {
    setTransactions((s) => s.map((t) => (t.id === id ? { ...t, review: !t.review } : t)));
  };

  const addCategory = (name) => {
    const n = name.trim();
    if (!n) return;
    if (categories.includes(n)) {
      toast.info('Category already exists');
      return;
    }
    setCategories((c) => [n, ...c]);
    toast.success(`Category "${n}" added`);
  };

  const clearAll = () => {
    if (transactions.length === 0) return;
    Swal.fire({
      title: 'Clear all transactions?',
      text: 'This will remove all saved transactions.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Clear',
    }).then((res) => {
      if (res.isConfirmed) {
        setTransactions([]);
        toast.success('All cleared');
      }
    });
  };

  // Derived summary
  const summary = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount || 0), 0);
    const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0);
    const balance = income - expenses;

    const catMap = {};
    transactions.filter((t) => t.type === 'expense').forEach((t) => {
      const c = (t.category || 'Other').trim();
      catMap[c] = (catMap[c] || 0) + Number(t.amount || 0);
    });

    const categoriesList = Object.keys(catMap);
    const catValues = categoriesList.map((c) => catMap[c]);

    const totalExpenses = expenses || 1;
    const wasteFlags = categoriesList
      .filter((c) => (catMap[c] / totalExpenses) * 100 >= 20)
      .map((c) => ({ category: c, amount: catMap[c], pct: Math.round((catMap[c] / totalExpenses) * 100) }));

    return { income, expenses, balance, categoriesList, catValues, wasteFlags };
  }, [transactions]);

  // Pie
  const pieData = useMemo(
    () => ({
      labels: summary.categoriesList.length ? summary.categoriesList : ['No data'],
      datasets: [
        {
          data: summary.catValues.length ? summary.catValues : [1],
          backgroundColor: ['#60a5fa', '#34d399', '#f472b6', '#f97316', '#facc15', '#a78bfa', '#60a5fa', '#94a3b8'],
          hoverOffset: 6,
        },
      ],
    }),
    [summary]
  );

  // Bar last 6 months
  const barData = useMemo(() => {
    const now = new Date();
    const months = [];
    const labels = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(`${d.getFullYear()}-${d.getMonth() + 1}`);
      labels.push(d.toLocaleString(undefined, { month: 'short' }));
    }
    const incomeB = {};
    const expenseB = {};
    months.forEach((m) => {
      incomeB[m] = 0;
      expenseB[m] = 0;
    });
    transactions.forEach((t) => {
      const d = new Date(t.createdAt);
      const k = `${d.getFullYear()}-${d.getMonth() + 1}`;
      if (!months.includes(k)) return;
      if (t.type === 'income') incomeB[k] += Number(t.amount || 0);
      else expenseB[k] += Number(t.amount || 0);
    });
    return {
      labels,
      datasets: [
        { label: 'Income', data: months.map((m) => incomeB[m]), backgroundColor: '#34d399' },
        { label: 'Expense', data: months.map((m) => expenseB[m]), backgroundColor: '#fb7185' },
      ],
    };
  }, [transactions]);

  const overSpent = summary.expenses > summary.income && (summary.expenses !== 0 || summary.income !== 0);

  return (
    <div className="dashboard-fullscreen">
      <Container fluid className="dashboard-root">
        <ToastContainer position="top-right" />
        <div className="dashboard-header mb-4">
          <h2>Budget Dashboard</h2>
          <div className="header-actions">
            <div className="goal-info text-end">
              <small className="muted d-block">Goal</small>
              <strong>{formatCurrency(goalAmount)}</strong>
            </div>

            <div className="header-controls">
              <Form.Control
                size="sm"
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value || 0))}
                style={{ width: 140 }}
              />
              <Button variant="outline-danger" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {overSpent && (
          <Alert variant="danger" className="mb-3">
            <strong>Alert:</strong> Expenses {formatCurrency(summary.expenses)} exceed income {formatCurrency(summary.income)}. Review categories.
          </Alert>
        )}

        <Row className="g-4">
          <Col lg={4} md={12} className="left-col">
            <Card className="panel p-3 sticky-card">
              <h5 className="card-title">Add Transaction</h5>
              <BudgetForm addTransaction={addTransaction} categories={categories} addCategory={addCategory} />

              <div className="mt-3">
                <small className="muted">Progress to goal</small>
                <ProgressBar
                  now={Math.max(0, Math.min(100, Math.round((summary.balance / goalAmount) * 100)))}
                  label={`${Math.max(0, Math.min(100, Math.round((summary.balance / goalAmount) * 100)))}%`}
                />
              </div>

              <div className="mt-3">
                <h6 className="muted">Manage categories</h6>
                <CategoryManager categories={categories} addCategory={addCategory} />
              </div>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="panel p-3">
              <h5 className="card-title">Summary</h5>
              <div className="summary-grid">
                <SummaryCard title="Income" value={formatCurrency(summary.income)} />
                <SummaryCard title="Expenses" value={formatCurrency(summary.expenses)} />
                <SummaryCard title="Balance" value={formatCurrency(summary.balance)} />
              </div>

              {summary.wasteFlags && summary.wasteFlags.length > 0 && (
                <div className="mt-3">
                  <small className="muted">High spending categories</small>
                  <ul className="waste-list">
                    {summary.wasteFlags.map((w) => (
                      <li key={w.category} className="waste-item">
                        <strong>{w.category}</strong> — {formatCurrency(w.amount)} ({w.pct}%)
                        <button className="btn btn-sm btn-link ms-2" onClick={() => suggestReduce(w.category)}>
                          Suggest
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-3">
                <small className="muted">Monthly overview</small>
                <div className="chart-area small">
                  <Bar
                    data={barData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: 'bottom' } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </div>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="panel p-3">
              <h5 className="card-title">Category Breakdown</h5>
              <div className="chart-area">
                <Pie data={pieData} />
              </div>

              <div className="mt-3">
                <small className="muted">Top categories</small>
                <ul className="top-cats">
                  {summary.categoriesList.length === 0 && <li className="muted">No expense data</li>}
                  {summary.categoriesList.slice(0, 6).map((c, i) => (
                    <li key={c} className={`cat-item ${summary.wasteFlags.find((w) => w.category === c) ? 'cat-flag' : ''}`}>
                      <span>{c}</span>
                      <span>{formatCurrency(summary.catValues[i] || 0)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Col>

          <Col xs={12}>
            <Card className="panel p-3">
              <h5 className="card-title">Transactions</h5>
              <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} toggleReview={toggleReview} />
              {transactions.length === 0 && <div className="empty-state">No transactions yet — add your first one.</div>}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );

  // helpers
  function suggestReduce(category) {
    const msg = `Try reducing ${category} by 20% — set a smaller weekly limit and track purchases.`;
    Swal.fire('Suggestion', msg, 'info');
  }
}

/* Inline CategoryManager component */
function CategoryManager({ categories, addCategory }) {
  const [val, setVal] = React.useState('');
  return (
    <div className="category-manage">
      <div className="d-flex gap-2">
        <input className="form-control form-control-sm" placeholder="New category" value={val} onChange={(e) => setVal(e.target.value)} />
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            if (!val.trim()) return;
            addCategory(val.trim());
            setVal('');
          }}
        >
          Add
        </button>
      </div>

      <div className="mt-2 cat-list">
        {categories.slice(0, 12).map((c) => (
          <span key={c} className="badge bg-light text-dark me-2 mb-2">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
