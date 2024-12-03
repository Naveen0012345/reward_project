const express = require('express');
const { registerBusiness,getBusinessList, getBusinessById, updateBusiness } = require('../controllers/businessController');
const verifyToken = require('../middleware/verifyToken'); // JWT middleware to verify token
const router = express.Router();
/**
 * @swagger
 * /businesses:
 *   post:
 *     summary: Registers a new business under the logged-in business owner.
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - business_type
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Elite Haircuts"
 *               business_type:
 *                 type: string
 *                 example: "Haircut"
 *     responses:
 *       201:
 *         description: Business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business created successfully"
 *                 business_id:
 *                   type: integer
 *                   example: 45
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business name is required"
 *       500:
 *         description: Server error
 */
router.post('/', verifyToken, registerBusiness);

/**
 * @swagger
 * /businesses:
 *   get:
 *     summary: Retrieves the list of businesses for the logged-in business owner.
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   business_id:
 *                     type: integer
 *                     example: 45
 *                   business_name:
 *                     type: string
 *                     example: "Elite Haircuts"
 *                   business_type:
 *                     type: string
 *                     example: "Haircut"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-12T10:00:00Z"
 *       404:
 *         description: No businesses found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No businesses found"
 *       500:
 *         description: Server error
 */
router.get('/', verifyToken, getBusinessList);

/**
 * @swagger
 * /businesses/{id}:
 *   get:
 *     summary: Get details of a specific business by ID
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the business to fetch
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with business details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 business_id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 service_type:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Business not found
 *       500:
 *         description: Server error
 */

// GET Business by ID
router.get('/:id', verifyToken, getBusinessById);

/**
 * @swagger
 * /businesses/{id}:
 *   put:
 *     summary: Update business details
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the business to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               business_type:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       404:
 *         description: Business not found
 *       500:
 *         description: Server error
 */

// PUT Update Business by ID
router.put('/:id', verifyToken, updateBusiness);


module.exports = router;
