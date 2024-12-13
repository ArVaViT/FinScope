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
  const hasStats = stats && stats.length > 0;
  const hasCharts = charts && charts.length > 0;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-overview">Overview of your financial activity</p>

      <div className="statistics">
        {hasStats ? (
          stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} />
          ))
        ) : (
          <p className="no-stats">No statistics available at the moment.</p>
        )}
      </div>

      <div className="charts">
        {hasCharts ? (
          charts.map((chart, index) => (
            <ChartContainer key={index} title={chart.title} content={chart.content} />
          ))
        ) : (
          <p className="no-charts">No charts available at the moment.</p>
        )}
      </div>
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
