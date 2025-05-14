import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function SummaryCard({ income, expenses }) {
  const balance = income - expenses;

  return (
    <div>
      <h3>Summary</h3>
      <Row>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Income</Card.Title>
              <Card.Text>₹{income}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Expenses</Card.Title>
              <Card.Text>₹{expenses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Balance</Card.Title>
              <Card.Text
                style={{
                  color: balance < 0 ? 'red' : 'green',
                }}
              >
                ₹{balance}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SummaryCard;
