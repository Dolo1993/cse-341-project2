const express = require('express');
const { body, param } = require('express-validator');
const productController = require('../controllers/productController');

// Add Passport middleware for authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You are unauthorized' });
};

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Get all products
 *     security:
 *       - githubOAuth: 
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/products', isAuthenticated, productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     description: Get a single product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - githubOAuth: []  
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/products/:id', [param('id').isMongoId()], isAuthenticated, productController.getSingleProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     description: Create a new product
 *     security:
 *       - githubOAuth: []  # Apply security to the route
 *     requestBody:
 *       description: Product details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/products', isAuthenticated, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     description: Update an existing product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - githubOAuth: []  
 *     requestBody:
 *       description: Update product details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put('/products/:id', [param('id').isMongoId()], isAuthenticated, productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     description: Delete a product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - githubOAuth: []  
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.delete('/products/:id', [param('id').isMongoId()], isAuthenticated, productController.deleteProduct);

module.exports = router;
