// server.js 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();
`+`+`'p`
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/products', productRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API está funcionando');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error en el servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});