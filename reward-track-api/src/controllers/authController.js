const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');
const Joi = require('@hapi/joi');
const logger = require('../utils/logger');


// Define Joi schema for login validation
const loginSchema = Joi.object({
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
        'string.pattern.base': 'Phone number must only contain digits.',
        'string.length': 'Phone number must be exactly 10 digits long.',
        'any.required': 'Phone number is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});

// Login controller
exports.login = async (req, res) => {
    logger.info("inside login");
    
    const { phone, password } = req.body;
    logger.info(`Login with phone : ${phone}`);


    // Validate request data using Joi
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Check if the user exists in the database
        const result = await pool.query('SELECT business_user_id, password_hash FROM businessusers WHERE phone = $1', [phone]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Compare the password with the stored hashed password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ user_id: user.business_user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message, token, and user ID
        res.status(200).json({
            message: 'Login successful',
            token,
            user_id: user.business_user_id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
