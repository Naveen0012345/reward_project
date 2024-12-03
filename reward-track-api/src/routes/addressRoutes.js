// routes/addressRoutes.js
const express = require('express');

const addressController = require('../controllers/addressController');
const verifyToken = require('../middleware/verifyToken'); 
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Address management
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     tags: [Address]
 *     summary: Create a new address test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_line_1:
 *                 type: string
 *               address_line_2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *               business_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address_id:
 *                   type: integer
 *                   example: 1
 *                 address_line_1:
 *                   type: string
 *                   example: 123 Main St
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', verifyToken, addressController.createAddress);

/**
 * @swagger
 * /addresses:
 *   get:
 *     tags: [Address]
 *     summary: Retrieve all addresses
 *     responses:
 *       200:
 *         description: List of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   address_id:
 *                     type: integer
 *                   address_line_1:
 *                     type: string
 *                   address_line_2:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postal_code:
 *                     type: string
 *                   country:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', verifyToken, addressController.getAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     tags: [Address]
 *     summary: Get address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Address ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address retrieved successfully
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.get('/:id', verifyToken, addressController.getAddressById);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     tags: [Address]
 *     summary: Update an existing address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Address ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_line_1:
 *                 type: string
 *               address_line_2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *               business_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       404:
 *         description: Address not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put('/:id', verifyToken, addressController.updateAddress);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     tags: [Address]
 *     summary: Delete an address
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Address ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyToken, addressController.deleteAddress);

module.exports = router;
