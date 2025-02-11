import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/confirm?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
        );
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || 'Email confirmed successfully.');
        } else {
          setMessage(data.message || 'Email confirmation failed.');
        }
      } catch (error) {
        setMessage('An error occurred during email confirmation.');
      }
    };

    if (email && token) {
      confirmEmail();
    } else {
      setMessage('Invalid confirmation link.');
    }
  }, [email, token]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Email Confirmation</h2>
      <p>{message}</p>
    </div>
  );
};

export default ConfirmEmail;
