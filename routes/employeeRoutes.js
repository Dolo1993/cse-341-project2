const express = require('express');
const { body, param } = require('express-validator');
const employeeController = require('../controllers/employeeController');

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
 * /api/employees:
 *   get:
 *     description: Get all employees
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
router.get('/employees', isAuthenticated, employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     description: Get a single employee by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - githubOAuth: 
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/employees/:id', [param('id').isMongoId()], isAuthenticated, employeeController.getSingleEmployee);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     description: Create a new employee
 *     security:
 *       - githubOAuth: []  # Apply security to the route
 *     requestBody:
 *       description: Employee details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/employees', isAuthenticated, employeeController.createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     description: Update an existing employee by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - githubOAuth: []
 *     requestBody:
 *       description: Update employee details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put('/employees/:id', [param('id').isMongoId()], isAuthenticated, employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     description: Delete an employee by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - githubOAuth: []  
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.delete('/employees/:id', [param('id').isMongoId()], isAuthenticated, employeeController.deleteEmployee);

module.exports = router;
