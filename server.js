const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const indexView = require('./views/index');

// Use dotenv for environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection setup with error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

// Use Express built-in middleware for parsing JSON
app.use(express.json());

// Mount routes
app.use('/api', employeeRoutes);
app.use('/api', productRoutes);
app.use('/', indexView);

app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
