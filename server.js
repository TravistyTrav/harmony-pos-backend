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

// Use Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
