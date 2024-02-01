const express = require('express');
const { body, param } = require('express-validator');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

/**
 * @swagger
 * /api/employees:
 *   get:
 *     description: Get all employees
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get('/employees', employeeController.getAllEmployees);

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
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/employees/:id', [param('id').isMongoId()], employeeController.getSingleEmployee);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     description: Create a new employee
 *     requestBody:
 *       description: Employee details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/employees', employeeController.createEmployee);

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
 *     requestBody:
 *       description: Update employee details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put('/employees/:id', [param('id').isMongoId()], employeeController.updateEmployee);

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
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.delete('/employees/:id', [param('id').isMongoId()], employeeController.deleteEmployee);

module.exports = router;
