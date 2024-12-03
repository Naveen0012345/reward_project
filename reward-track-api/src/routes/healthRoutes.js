const express = require('express');
const router = express.Router();
const { checkHealth } = require('../controllers/healthController');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check API
 *     description: Returns API health status.
 *     responses:
 *       200:
 *         description: API is up and running.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: UP
 */
router.get('/health', checkHealth);

module.exports = router;
