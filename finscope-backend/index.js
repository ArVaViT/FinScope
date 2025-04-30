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
const aiRoutes = require('./routes/ai');

dotenv.config();

// 🧠 ПІДКЛЮЧЕННЯ ДО MONGODB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const app = express();

const allowedOrigins = [
  'https://www.officialfinscope.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

// Роутинг
app.use('/ai', aiRoutes);
app.use('/auth', authRoutes);
app.use('/auth', passwordRoutes);
app.use('/auth', confirmRoutes);
app.use('/profile', profileRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/notifications', notificationsRoutes);

// Глобальний обробник помилок
app.use(errorHandler);

// Старт сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
