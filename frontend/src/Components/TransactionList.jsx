import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function TransactionList({ transactions }) {
  return (
    <div>
      <h3>Transaction List</h3>
      <Card>
        <ListGroup variant="flush">
          {transactions.length === 0 ? (
            <ListGroup.Item>No transactions added</ListGroup.Item>
          ) : (
            transactions.map((transaction, index) => (
              <ListGroup.Item key={index}>
                <strong>{transaction.description}</strong>
                <span
                  style={{
                    float: 'right',
                    color: transaction.type === 'expense' ? 'red' : 'green',
                  }}
                >
                  ₹{transaction.amount}
                </span>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>
    </div>
  );
}

export default TransactionList;
