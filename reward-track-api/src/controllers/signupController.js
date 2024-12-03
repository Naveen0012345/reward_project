const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const logger = require('../utils/logger');


const signupSchema = Joi.object({
    firstName: Joi.string().min(1).max(100).required().messages({
      'any.required': 'FirstName is required'
    }),
    lastName: Joi.string().allow('').optional().messages({
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().allow('').optional().messages({
      'string.email': 'Please provide a valid email address'
    }),
    password: Joi.string().min(5).required().messages({
      'string.min': 'Password must be at least 5 characters long',
      'any.required': 'Password is required'
    }),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
      'string.pattern.base': 'Phone number must only contain digits.',
      'string.length': 'Phone number must be exactly 10 digits long.',
      'any.required': 'Phone number is required'
    })
  });
  
  

exports.signup = async (req, res) => {
    logger.info("inside signup");
    const { firstName, lastName, email, password, phone } = req.body;
  
    // Validate request data using Joi
    const { error } = signupSchema.validate(req.body);
    if (error) {

      return res.status(400).json({ message: error.details[0].message });
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO businessusers (first_name,last_name, email, password_hash, phone) VALUES ($1, $2, $3, $4, $5) RETURNING business_user_id';
      console.log(query)
      // Insert the new user into the database
      const result = await pool.query(
        query,
        [firstName, lastName, email, hashedPassword, phone]
      );
      
      const userId = result.rows[0].user_id;
      res.status(201).json({ message: 'Registration successful', user_id: userId });
    } catch (error) {
      if (error.code === '23505') {  // Unique constraint violation for email
        res.status(400).json({ message: 'Mobile already exists' });
      } else {
        res.status(500).json({ message: 'Server error', error });
      }
    }
  };
