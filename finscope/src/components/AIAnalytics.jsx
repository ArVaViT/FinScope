import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../styles/AIAnalytics.css';

const AIAnalytics = ({ transactions }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAIComment = useCallback(async () => {
    console.log('📤 Надсилаємо транзакції в AI:', transactions);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions }),
      });

      if (!res.ok) {
        console.error('❌ Помилка відповіді від бекенду:', res.status);
        throw new Error('AI error');
      }

      const data = await res.json();
      console.log('✅ Отримано відповідь від AI:', data);

      setComment(data.comment || 'AI не повернув коментар.');
    } catch (err) {
      console.error('🔥 Помилка запиту до AI:', err);
      setError('Не вдалося отримати AI-аналітику. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    console.log('🚀 useEffect: перевіряємо transactions', transactions);
    if (transactions && transactions.length > 0) {
      fetchAIComment();
    } else {
      console.log('⚠️ Транзакції відсутні або пусті');
    }
  }, [transactions, fetchAIComment]);

  return (
    <div className="ai-analytics-container">
      <header className="analytics-header">
        <h2 className="analytics-title">AI Analytics</h2>
        <p className="analytics-description">
          Короткий AI-коментар до ваших фінансів.
        </p>
        <button className="refresh-button" onClick={fetchAIComment} disabled={loading}>
          Refresh Data
        </button>
      </header>

      {loading && <p className="loading">Завантаження AI-коментаря...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && comment && (
        <div className="analytics-content">
          <div className="analytics-summary">
            <p className="ai-comment">
              💬 <em>{comment}</em>
            </p>
          </div>
        </div>
      )}

      {!loading && !error && !comment && (
        <p className="no-data">
          AI поки не згенерував коментар. Спробуйте оновити.
        </p>
      )}
    </div>
  );
};

AIAnalytics.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AIAnalytics;
