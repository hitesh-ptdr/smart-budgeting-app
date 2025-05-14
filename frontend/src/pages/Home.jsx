import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Button, Container, Row, Col, ButtonGroup } from "react-bootstrap";
import { FaDollarSign, FaChartLine, FaCogs } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Home.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const [period, setPeriod] = useState("1M");

  const spendingData = {
    "1M": {
      labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Others"],
      data: [500, 200, 100, 150, 50],
    },
    "3M": {
      labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Others"],
      data: [1500, 600, 300, 400, 200],
    },
    "6M": {
      labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Others"],
      data: [3000, 1200, 600, 800, 400],
    },
  };

  const data = {
    labels: spendingData[period].labels,
    datasets: [
      {
        label: `Spending Categories (${period})`,
        data: spendingData[period].data,
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6c757d"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="home-container">
      <Container>
        <Row className="hero-section text-center">
          <Col>
            <h1>Welcome to PennyPocket</h1>
            <p>Your trusted tool to manage your money better and smarter!</p>
            <Button variant="light" size="lg" href="/dashboard">
              Get Started
            </Button>
          </Col>
        </Row>

        <Row className="features-section text-center">
          <Col md={4}>
            <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div className="feature-card">
                <FaDollarSign size={50} />
                <h3>Track Income</h3>
                <p>Monitor all your income streams effortlessly.</p>
              </div>
            </Tilt>
          </Col>

          <Col md={4}>
            <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div className="feature-card">
                <FaChartLine size={50} />
                <h3>Analyze Spending</h3>
                <p>Visualize your spending habits with charts.</p>

                <ButtonGroup className="mb-3">
                  <Button
                    variant={period === "1M" ? "primary" : "outline-primary"}
                    onClick={() => setPeriod("1M")}
                  >
                    1 Month
                  </Button>
                  <Button
                    variant={period === "3M" ? "primary" : "outline-primary"}
                    onClick={() => setPeriod("3M")}
                  >
                    3 Months
                  </Button>
                  <Button
                    variant={period === "6M" ? "primary" : "outline-primary"}
                    onClick={() => setPeriod("6M")}
                  >
                    6 Months
                  </Button>
                </ButtonGroup>

                <div style={{ maxWidth: "280px", margin: "0 auto" }}>
                  <Pie data={data} />
                </div>
              </div>
            </Tilt>
          </Col>

          <Col md={4}>
            <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div className="feature-card">
                <FaCogs size={50} />
                <h3>Set Goals</h3>
                <p>Create budgets and stick to them with alerts!</p>
              </div>
            </Tilt>
          </Col>
        </Row>

        <Row className="footer-section text-center">
          <Col>
            <p>&copy; 2025 PennyPocket. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
