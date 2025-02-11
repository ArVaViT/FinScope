import React, { useState, useEffect, useCallback, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import './styles/global.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import Settings from './components/Settings';
import AIAnalytics from './components/AIAnalytics';
import Notifications from './components/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import PasswordRecovery from './pages/PasswordRecovery';
import ResetPassword from './pages/ResetPassword';
import ConfirmEmail from './pages/ConfirmEmail';

const baseUrl = import.meta.env.VITE_API_URL;

const AppContent = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('isDarkMode');
    return stored ? JSON.parse(stored) : false;
  });
  const token = localStorage.getItem('token');

  const fetchTransactions = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${baseUrl}/transactions`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [token]);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${baseUrl}/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
      fetchNotifications();
    }
  }, [isAuthenticated, fetchTransactions, fetchNotifications]);

  const fetchPredictions = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ transactions }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
    return { totalIncome: 0, totalExpenses: 0, savings: 0, expenseBreakdown: [] };
  }, [token, transactions]);

  const onAddTransaction = useCallback(async (transaction) => {
    if (!token) return;
    try {
      const response = await fetch(`${baseUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      });
      if (response.ok) {
        const newTransaction = await response.json();
        setTransactions(prev => [...prev, newTransaction]);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  }, [token]);

  const onUpdateTransaction = useCallback(async (id, updatedData) => {
    if (!token) return;
    try {
      const response = await fetch(`${baseUrl}/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedTransaction = await response.json();
        setTransactions(prev => prev.map(tx => (tx._id === id ? updatedTransaction : tx)));
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  }, [token]);

  const onDeleteTransaction = useCallback(async (id) => {
    if (!token) return;
    try {
      const response = await fetch(`${baseUrl}/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setTransactions(prev => prev.filter(tx => tx._id !== id));
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }, [token]);

  const onDismissNotification = useCallback(async (id) => {
    if (!token) return;
    try {
      const response = await fetch(`${baseUrl}/notifications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setNotifications(prev => prev.filter(notif => notif._id !== id));
      }
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  }, [token]);

  const onUpdateProfile = useCallback(async (profileData) => {
    try {
      const response = await fetch(`${baseUrl}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }, [token]);

  const onChangePassword = useCallback(async (passwordData) => {
    try {
      const response = await fetch(`${baseUrl}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
      if (!response.ok) {
        console.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  }, [token]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/auth';
  }, [setIsAuthenticated]);

  return (
    <Router>
      {isAuthenticated && (
        <Navbar
          links={[
            { href: '/', label: 'Dashboard' },
            { href: '/transactions', label: 'Transactions' },
            { href: '/analytics', label: 'AI Analytics' },
            { href: '/settings', label: 'Settings' },
            { href: '/notifications', label: 'Notifications' }
          ]}
          logoText="FinScope"
          onLogout={handleLogout}
        />
      )}
      <main>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<ProtectedRoute><Dashboard transactions={transactions} /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><TransactionForm onAddTransaction={onAddTransaction} onUpdateTransaction={onUpdateTransaction} onDeleteTransaction={onDeleteTransaction} transactions={transactions} /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AIAnalytics fetchPredictions={fetchPredictions} transactions={transactions} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings onUpdateProfile={onUpdateProfile} onChangePassword={onChangePassword} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications notifications={notifications} onDismiss={onDismissNotification} /></ProtectedRoute>} />
        </Routes>
      </main>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
