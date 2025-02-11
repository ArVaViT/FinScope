import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TransactionJournal.css';

const TransactionJournal = ({ transactions }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const transactionsForMonth = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth;
  });

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(nextMonth);
  };

  const monthLabel = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="transaction-journal">
      <div className="journal-header">
        <button className="arrow-button" onClick={goToPreviousMonth}>&larr;</button>
        <h2 className="journal-title">{monthLabel}</h2>
        <button className="arrow-button" onClick={goToNextMonth}>&rarr;</button>
      </div>
      <div className="journal-transactions">
        {transactionsForMonth.length > 0 ? (
          transactionsForMonth.map(tx => (
            <div key={tx._id} className="transaction-item">
              <div className="transaction-row">
                <span className="transaction-description">{tx.description}</span>
                <span className="transaction-amount">${Number(tx.amount).toFixed(2)}</span>
              </div>
              <div className="transaction-row">
                <span className="transaction-date">{new Date(tx.date).toLocaleDateString()}</span>
                <span className="transaction-category">{tx.category}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-transactions">No transactions for this month.</p>
        )}
      </div>
    </div>
  );
};

TransactionJournal.propTypes = {
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

export default TransactionJournal;
