const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');
const profileRoutes = require('./routes/profile');
const transactionsRoutes = require('./routes/transactions');
const notificationsRoutes = require('./routes/notifications');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');
const confirmRoutes = require('./routes/confirm');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Смонтировать маршруты для аутентификации и сброса пароля на один префикс /auth
app.use('/auth', authRoutes);
app.use('/auth', passwordRoutes);

app.use('/profile', profileRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/auth', confirmRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
