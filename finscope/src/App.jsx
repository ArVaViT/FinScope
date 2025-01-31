import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import Settings from './components/Settings';
import AIAnalytics from './components/AIAnalytics';
import Notifications from './components/Notifications';
import './styles/global.css'; 

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to FinScope!', type: 'info' },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('isDarkMode')) || false
  );

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const addTransaction = useCallback((transaction) => {
    if (!transaction.description || !transaction.amount || !transaction.date) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: prevNotifications.length + 1, message: 'Invalid transaction data!', type: 'error' },
      ]);
      return;
    }
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { ...transaction, id: prevTransactions.length + 1 },
    ]);
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: prevNotifications.length + 1, message: 'New transaction added!', type: 'info' },
    ]);
  }, []);

  const fetchNotifications = async () => {
    return notifications;
  };

  const fetchPredictions = async () => {
    try {
      return [
        { category: 'Savings', suggestion: 'Consider increasing your monthly savings by 5%' },
        { category: 'Spending', suggestion: 'Your spending on entertainment is higher than average' },
      ];
    } catch (error) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: prevNotifications.length + 1, message: 'Error fetching predictions!', type: 'error' },
      ]);
      return [];
    }
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
        <Navbar
          links={[
            { href: '/', label: 'Dashboard' },
            { href: '/transactions', label: 'Transactions' },
            { href: '/analytics', label: 'AI Analytics' },
            { href: '/settings', label: 'Settings' },
            { href: '/notifications', label: 'Notifications' },
          ]}
          logoText="FinScope"
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard stats={transactions} charts={[]} />}
            />
            <Route
              path="/transactions"
              element={<TransactionForm onAddTransaction={addTransaction} />}
            />
            <Route
              path="/analytics"
              element={<AIAnalytics fetchPredictions={fetchPredictions} />}
            />
            <Route
              path="/settings"
              element={
                <Settings 
                  onUpdateProfile={(profile) => console.log('Profile updated:', profile)} 
                  onChangePassword={(password) => console.log('Password changed:', password)}
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              }
            />
            <Route
              path="/notifications"
              element={<Notifications notifications={notifications} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;