require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./firebase/firebase-config');

const app = express();

app.use(cors(({ origin: '*'})));
app.use(bodyParser.json());

// Import Routes
const inventoryRoutes = require('./routes/inventory');
const salesRoutes = require('./routes/sales');
const tabRoutes = require('./routes/tab');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');
const punchClockRoutes = require('./routes/punch-clock');

// Use Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/tab', tabRoutes)
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/punch-clock', punchClockRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
