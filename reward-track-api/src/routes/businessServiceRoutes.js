const express = require('express');
const { addService, getServiceById, updateService, deleteService, getServicesByBusinessId} = require('../controllers/businessServicesController');
const verifyToken = require('../middleware/verifyToken'); // JWT middleware to verify token
const router = express.Router();

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Add a new service to a business
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               business_id:
 *                 type: integer
 *                 description: The ID of the business to which the service belongs
 *               service_name:
 *                 type: string
 *                 description: The name of the service
 *               price:
 *                 type: number
 *                 description: The price of the service
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Service added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

// POST Add a new service to a business
router.post('/', verifyToken, addService);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get details of a specific service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to retrieve
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service details retrieved successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */

// GET Get details of a specific service by ID
router.get('/:id', verifyToken, getServiceById);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a specific service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_name:
 *                 type: string
 *                 description: The new name of the service
 *               price:
 *                 type: number
 *                 description: The new price of the service
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */

// PUT Update a specific service by ID
router.put('/:id', verifyToken, updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a specific service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */

// DELETE Delete a specific service by ID
router.delete('/:id', verifyToken, deleteService);

/**
 * @swagger
 * /services/{id}/businesses:
 *   get:
 *     summary: Get all services for a specific business
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the business to get services for
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *       404:
 *         description: No services found for this business
 *       500:
 *         description: Server error
 */

// GET Get all services for a specific business by business ID
router.get('/:id/businesses', verifyToken, getServicesByBusinessId);


module.exports = router;
