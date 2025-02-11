import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/TransactionForm.css';

const TransactionForm = ({ onAddTransaction }) => {
  const [transaction, setTransaction] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });
  
  const descriptionInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    if (!transaction.description.trim()) {
      errors.push('Description is required.');
    }
    const amountValue = Number(transaction.amount);
    if (!transaction.amount || isNaN(amountValue) || amountValue <= 0) {
      errors.push('Amount must be a positive number.');
    }
    if (!transaction.date) {
      errors.push('Date is required.');
    }
    if (!transaction.category) {
      errors.push('Category is required.');
    }
    if (errors.length > 0) {
      alert(errors.join(' '));
      return;
    }
    onAddTransaction({
      description: transaction.description.trim(),
      amount: parseFloat(transaction.amount),
      date: transaction.date,
      category: transaction.category,
    });
    setTransaction({ description: '', amount: '', date: '', category: '' });
    if (descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }
  };

  return (
    <div className="transaction-form">
      <header className="transaction-form-header">
        <h2 className="transaction-form-title">Add New Transaction</h2>
        <p className="transaction-form-description">
          Log your transaction details below.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="transaction-form-container">
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={transaction.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className="form-input"
            required
            ref={descriptionInputRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transaction.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="form-input"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            value={transaction.category}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Select a category</option>
            <option value="Income">Income</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="form-button">Add Transaction</button>
      </form>
    </div>
  );
};

TransactionForm.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
};

export default TransactionForm;
