import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Dashboard.css';
import TransactionJournal from './TransactionJournal';

const ChartPlaceholder = () => (
  <div className="chart-placeholder-container">
    <h2 className="chart-title">Financial Chart</h2>
    <p>Chart will appear here.</p>
  </div>
);

const Dashboard = ({ transactions }) => {
  const totalIncome = transactions
    .filter(tx => tx.category.toLowerCase() === 'income')
    .reduce((acc, tx) => acc + Number(tx.amount), 0);
  const totalExpenses = transactions
    .filter(tx => tx.category.toLowerCase() !== 'income')
    .reduce((acc, tx) => acc + Number(tx.amount), 0);
  const savings = totalIncome - totalExpenses;
  const transactionCount = transactions.length;
  const averageTransaction =
    transactionCount > 0 ? (totalIncome + totalExpenses) / transactionCount : 0;
  const highestTransaction = transactions.reduce(
    (max, tx) => Math.max(max, Number(tx.amount)),
    0
  );
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-overview">Overview of your financial activity.</p>
      </header>
      <div className="statistics-section">
        <div className="statistics-grid">
          <div className="stat-card">
            <h3 className="stat-title">Total Income</h3>
            <p className="stat-value">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Expenses</h3>
            <p className="stat-value">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Savings</h3>
            <p className="stat-value">${savings.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Transactions</h3>
            <p className="stat-value">{transactionCount}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Avg Transaction</h3>
            <p className="stat-value">${averageTransaction.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Highest Transaction</h3>
            <p className="stat-value">${highestTransaction.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-bottom">
        <div className="dashboard-block">
          <TransactionJournal transactions={transactions} />
        </div>
        <div className="dashboard-block">
          <ChartPlaceholder />
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dashboard;
