import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Dashboard.css';
import '../styles/global.css';

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h2 className="stat-title">{title}</h2>
    <p className="stat-value">{isNaN(value) ? value : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}</p>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const ChartContainer = ({ title, content }) => (
  <div className="chart-container">
    <h3 className="chart-title">{title}</h3>
    <div className="chart-placeholder">{content}</div>
  </div>
);

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

const Dashboard = ({ stats = [], charts = [] }) => {
  const defaultStats = [
    { title: 'Total Income', value: 12000 },
    { title: 'Total Expenses', value: 8000 },
    { title: 'Savings', value: 4000 },
  ];

  const defaultCharts = [
    { title: 'Income vs Expenses', content: <p>Sample chart will appear here. Add your data to see detailed analysis.</p> },
    { title: 'Savings Growth', content: <p>Sample chart will appear here. Add your data to see trends over time.</p> },
  ];

  const hasUserContent = stats.length > 0 || charts.length > 0;

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-overview">Overview of your financial activity. If you haven't added any data yet, the information below is only a sample.</p>
      </header>

      {!hasUserContent && (
        <div className="dashboard-notice-container">
          <p className="dashboard-notice">
            These are example data. Add your financial information to see personalized stats and charts.
          </p>
        </div>
      )}

      <section className="statistics-section">
        <h2 className="section-title">Statistics</h2>
        <div className="statistics-grid">
          {(hasUserContent ? stats : defaultStats).map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>
      </section>

      <section className="charts-section">
        <h2 className="section-title">Charts</h2>
        <div className="charts-grid">
          {(hasUserContent ? charts : defaultCharts).map((chart, index) => (
            <ChartContainer key={index} title={chart.title} content={chart.content} />
          ))}
        </div>
      </section>

      {!hasUserContent && (
        <section className="dashboard-placeholder-section">
          <h3 className="section-title">Placeholder Charts</h3>
          <div className="dashboard-placeholder-images">
            <img src="../imgs/" alt="Placeholder Chart 1" className="chart-image" />
            <img src="/placeholder2.png" alt="Placeholder Chart 2" className="chart-image" />
          </div>
        </section>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  charts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ),
};

export default Dashboard;
