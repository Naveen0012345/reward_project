const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a registered user with phone number and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9849555208"
 *               password:
 *                 type: string
 *                 example: "Test@123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "jwt-token"
 *                 user_id:
 *                   type: integer
 *                   example: 123
 *       400:
 *         description: Invalid phone number or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid phone number or password"
 *       500:
 *         description: Server error
 */
router.post('/login', login);

module.exports = router;
