import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';


function BudgetForm({ addTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount) {
      addTransaction({ description, amount: parseFloat(amount), type });
      setDescription('');
      setAmount('');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <Container>
      <h3>Add Transaction</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Transaction Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Transaction
        </Button>
      </Form>
    </Container>
  );
}

export default BudgetForm;
