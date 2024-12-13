import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TransactionForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionForm = ({ onAddTransaction }) => {
  const [transaction, setTransaction] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const validateTransaction = () => {
    const errors = [];
    if (!transaction.description.trim()) errors.push('Description is required.');
    if (!transaction.amount || isNaN(Number(transaction.amount)) || Number(transaction.amount) <= 0) {
      errors.push('Amount must be a positive number.');
    }
    if (!transaction.date) errors.push('Date is required.');
    if (!transaction.category) errors.push('Category is required.');
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateTransaction();
    if (errors.length > 0) {
      toast.error(errors.join(' '), {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      onAddTransaction(transaction);
      toast.success('Transaction added successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTransaction({ description: '', amount: '', date: '', category: '' });
    }
  };

  return (
    <div className="transaction-form">
      <h2 className="form-title">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form-container">
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={transaction.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transaction.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={transaction.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Transaction</button>
      </form>
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

TransactionForm.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
};

export default TransactionForm;
