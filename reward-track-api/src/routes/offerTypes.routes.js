// routes/offerTypes.routes.js
const express = require('express');
const router = express.Router();
const {getOfferTypes} = require('../controllers/offerTypes.controller');
const verifyToken = require('../middleware/verifyToken'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     OfferType:
 *       type: object
 *       required:
 *         - offer_type_name
 *       properties:
 *         offer_type_id:
 *           type: integer
 *           description: Auto-generated ID for the offer type
 *         offer_type_name:
 *           type: string
 *           description: The name of the offer type
 *         description:
 *           type: string
 *           description: Description of the offer type
 */

/**
 * @swagger
 * /offers-types:
 *   get:
 *     summary: Retrieve a list of all offer types
 *     tags: [OfferTypes]
 *     responses:
 *       200:
 *         description: List of offer types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OfferType'
 */
router.get('/', verifyToken, getOfferTypes);


module.exports = router;
