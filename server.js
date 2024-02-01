/* Required statement area */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const indexView = require('./views/index');

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project2',
      version: '1.0.0',
    },
  }, 
// my route files
  apis: ['./routes/*.js'],  
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/api', employeeRoutes);
app.use('/api', productRoutes);
app.use('/', indexView);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
