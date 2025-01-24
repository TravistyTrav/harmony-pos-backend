require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./firebase/firebase-config');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Import Routes
const inventoryRoutes = require('./routes/inventory');
const salesRoutes = require('./routes/sales');
const tabRoutes = require('./routes/tab');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');

// Use Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/tab', tabRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);

// Start Node.js server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});
