require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');
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

// HTTP-to-HTTPS Redirect
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80, () => console.log('HTTP redirect server running on port 80'));

// HTTPS Options (Ensure permissions for reading cert files)
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/strida.io/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/strida.io/fullchain.pem'),
};

// Start HTTPS Server
const PORT = process.env.PORT || 443;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
