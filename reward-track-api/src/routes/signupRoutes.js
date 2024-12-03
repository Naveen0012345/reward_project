const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/signupController');

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup a new user
 *     description: Register a new user with name, email, password, and phone.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Server error
 */
router.post('/signup', signup);

module.exports = router;
