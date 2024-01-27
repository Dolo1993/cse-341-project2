require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const indexView = require('./views/index');
 

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection  
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

//   Express built-in middleware
app.use(express.json());

// Mount routes
app.use('/api', employeeRoutes);
app.use('/api', productRoutes);
app.use('/', indexView);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
