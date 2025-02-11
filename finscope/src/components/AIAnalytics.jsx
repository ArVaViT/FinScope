import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../styles/AIAnalytics.css';

const AIAnalytics = ({ initialData = null, fetchPredictions }) => {
  const [analyticsData, setAnalyticsData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!initialData);

  const loadAnalytics = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchPredictions();
      setAnalyticsData(data);
    } catch (err) {
      setError('Failed to fetch analytics data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [fetchPredictions]);

  useEffect(() => {
    if (!initialData) {
      loadAnalytics();
    }
  }, [initialData, loadAnalytics]);

  const renderExpenseBreakdown = (expenseBreakdown) => (
    <div className="expense-breakdown">
      <h3 className="expense-breakdown-title">Expense Breakdown</h3>
      <ul className="expense-breakdown-list">
        {expenseBreakdown.map((item, index) => (
          <li key={index} className="expense-breakdown-item">
            <span className="expense-category">{item.category}</span>: 
            <span className="expense-amount">${Number(item.amount).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="ai-analytics-container">
      <header className="analytics-header">
        <h2 className="analytics-title">AI Analytics</h2>
        <p className="analytics-description">
          Detailed insights and predictions powered by AI.
        </p>
        <button className="refresh-button" onClick={loadAnalytics} disabled={loading}>
          Refresh Data
        </button>
      </header>
      {loading && <p className="loading">Loading analytics...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && analyticsData ? (
        <div className="analytics-content">
          <div className="analytics-summary">
            <p>
              <strong>Total Income:</strong> ${analyticsData.totalIncome ? analyticsData.totalIncome.toFixed(2) : '0.00'}
            </p>
            <p>
              <strong>Total Expenses:</strong> ${analyticsData.totalExpenses ? analyticsData.totalExpenses.toFixed(2) : '0.00'}
            </p>
            <p>
              <strong>Savings:</strong> ${analyticsData.savings ? analyticsData.savings.toFixed(2) : '0.00'}
            </p>
          </div>
          {analyticsData.expenseBreakdown &&
            analyticsData.expenseBreakdown.length > 0 &&
            renderExpenseBreakdown(analyticsData.expenseBreakdown)}
        </div>
      ) : null}
      {!loading && !error && !analyticsData && (
        <p className="no-data">
          No analytics data available. Please try refreshing or check your network connection.
        </p>
      )}
    </div>
  );
};

AIAnalytics.propTypes = {
  initialData: PropTypes.shape({
    totalExpenses: PropTypes.number,
    totalIncome: PropTypes.number,
    savings: PropTypes.number,
    expenseBreakdown: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ),
  }),
  fetchPredictions: PropTypes.func.isRequired,
};

export default AIAnalytics;
