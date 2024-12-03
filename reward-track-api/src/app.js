const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const signupRoutes = require('./routes/signupRoutes');
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const businessServiceRoutes = require('./routes/businessServiceRoutes');
const addressRoutes = require('./routes/addressRoutes');
const offersRoutes = require('./routes/offers.routes');
const offerTypesRoutes = require('./routes/offerTypes.routes');

const setupSwaggerDocs = require('./swagger');

const app = express();

// Use CORS middleware
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify a specific origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Middleware (if any)
app.use(express.json());

// Routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1', signupRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/businesses', businessRoutes);
app.use('/api/v1/services', businessServiceRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/offers', offersRoutes);
app.use('/api/v1/offers-types', offerTypesRoutes);

// Swagger documentation
setupSwaggerDocs(app);

module.exports = app;
