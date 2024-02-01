const express = require('express');
const { body, param } = require('express-validator');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get('/products', productController.getAllProducts);

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
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/products/:id', [param('id').isMongoId()], productController.getSingleProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     description: Create a new product
 *     requestBody:
 *       description: Product details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/products', productController.createProduct);

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
 *     requestBody:
 *       description: Update product details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put('/products/:id', [param('id').isMongoId()], productController.updateProduct);

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
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.delete('/products/:id', [param('id').isMongoId()], productController.deleteProduct);

module.exports = router;

