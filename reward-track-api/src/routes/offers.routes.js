// routes/offers.routes.js
const express = require('express');
const router = express.Router();
const { createOffer, getOffersByBusinessId, deleteOfferById } = require('../controllers/offers.controller');
const verifyToken = require('../middleware/verifyToken'); 

// Swagger documentation for creating an offer
/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offer
 *     description: Creates a new offer with a QR code.
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               business_id:
 *                 type: integer
 *               offer_type_id:
 *                 type: integer
 *               offer_name:
 *                 type: string
 *               description:
 *                 type: string
 *               visit_threshold:
 *                 type: integer
 *               discount_percentage:
 *                 type: number
 *               loyalty_points_per_visit:
 *                 type: integer
 *               max_redeemable_points:
 *                 type: integer
 *               valid_until:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Offer created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, createOffer);

/**
 * @swagger
 * /offers/business/{businessId}:
 *   get:
 *     summary: Get offers by business ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the business
 *     responses:
 *       200:
 *         description: List of offers for the specified business
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/business/:businessId', verifyToken, getOffersByBusinessId);

/**
 * @swagger
 * /offers/{offer_id}:
 *   delete:
 *     summary: Delete an offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: offer_id
 *         required: true
 *         description: The ID of the offer to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Offer deleted successfully
 *       404:
 *         description: Offer not found
 *       400:
 *         description: Invalid offer ID
 *       500:
 *         description: Server error
 */
router.delete('/:offer_id', verifyToken, deleteOfferById);


module.exports = router;
