import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/AIAnalytics.css';
import '../styles/global.css';

const AIAnalytics = ({ initialData = null, fetchPredictions }) => {
  const [analyticsData, setAnalyticsData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialData) {
        try {
          setLoading(true);
          const data = await fetchPredictions();
          setAnalyticsData(data);
        } catch (err) {
          setError('Failed to fetch analytics data.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [initialData, fetchPredictions]);

  const renderExpenseBreakdown = (expenseBreakdown) => (
    <div className="expense-breakdown">
      <h3>Expense Breakdown</h3>
      <ul>
        {expenseBreakdown.map((item, index) => (
          <li key={index} className="expense-item">
            <span>{item.category}</span>: <span>${item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (loading) {
    return <p className="loading">Loading analytics...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className={`ai-analytics-container main-content`}>
      <h2>AI Analytics</h2>
      {analyticsData && analyticsData.expenseBreakdown ? (
        <div className="analytics-content">
          <div className="summary">
            <p><strong>Total Income:</strong> ${analyticsData.totalIncome || 0}</p>
            <p><strong>Total Expenses:</strong> ${analyticsData.totalExpenses || 0}</p>
            <p><strong>Savings:</strong> ${analyticsData.savings || 0}</p>
          </div>
          {renderExpenseBreakdown(analyticsData.expenseBreakdown)}
        </div>
      ) : (
        <p className="no-data">No analytics data available. Please try refreshing or check your network connection.</p>
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
        category: PropTypes.string,
        amount: PropTypes.number,
      })
    ),
  }),
  fetchPredictions: PropTypes.func.isRequired,
};

export default AIAnalytics;
