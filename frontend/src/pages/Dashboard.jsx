import React, { useState, useEffect } from 'react';
import BudgetForm from '../Components/BudgetForm';
import TransactionList from '../Components/TransactionList';
import SummaryCard from '../Components/SummaryCard';
import { Container, Row, Col, Card } from 'react-bootstrap';
import API from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const goalAmount = 2000; // 🎯 set your saving goal here

  // Load all transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await API.get(`/transaction/${userId}`);
      setTransactions(res.data);     
      calculateSummary(res.data);
    } catch (err) {
      toast.error('Failed to fetch transactions');
    }
  };

  const calculateSummary = (data) => {
    let totalIncome = 0, totalExpense = 0;
    data.forEach(tx => {
      if (tx.type === 'income') totalIncome += tx.amount;
      else totalExpense += tx.amount;
    });
    setIncome(totalIncome);
    setExpenses(totalExpense);

    // 🎉 Alert when goal is reached
    if (totalIncome - totalExpense >= goalAmount) {
      Swal.fire('🎯 Goal Achieved!', 'You have reached your savings goal!', 'success');
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await API.post('/transaction', { ...transaction, userId });
      toast.success('Transaction added!');
      const updated = [...transactions, res.data];
      setTransactions(updated);
      calculateSummary(updated);
    } catch (err) {
      toast.error('Failed to add transaction');
    }
  };

  return (
    <Container fluid className="dashboard-container">
      <ToastContainer />
      <Row className="my-4">
        <Col md={6}>
          <Card className="budget-form-card shadow-sm mb-4">
            <Card.Title className="text-center">Add Transaction</Card.Title>
            <BudgetForm addTransaction={addTransaction} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="summary-card shadow-sm mb-4">
            <Card.Title className="text-center">Summary</Card.Title>
            <SummaryCard income={income} expenses={expenses} />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="transaction-list-card shadow-sm">
            <Card.Title className="text-center">Transaction List</Card.Title>
            <TransactionList transactions={transactions} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
