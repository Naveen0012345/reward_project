const pool = require('../utils/db');
const Joi = require('@hapi/joi');

// Define Joi schema for business registration validation
const businessSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Business name is required'
  }),
  business_type: Joi.string().required().messages({
    'any.required': 'Business type is required'
  })
});

// Register business controller
exports.registerBusiness = async (req, res) => {
  const { name, business_type } = req.body;

  // Validate request data using Joi
  const { error } = businessSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the user_id from the JWT token
  const business_user_id = req.user.user_id;

  try {
    // Insert the new business into the database
    const result = await pool.query(
      'INSERT INTO Businesses (business_user_id, business_name, business_type) VALUES ($1, $2, $3) RETURNING business_id',
      [business_user_id, name, business_type]
    );

    const business_id = result.rows[0].business_id;

    // Respond with success message and business ID
    res.status(201).json({
      message: 'Business created successfully',
      business_id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get business list controller
exports.getBusinessList = async (req, res) => {
  // Get the user_id from the JWT token
  const business_user_id = req.user.user_id;

  try {
    // Retrieve the list of businesses for the logged-in user
    const result = await pool.query(
      'SELECT business_id, business_name, business_type, created_at FROM Businesses WHERE business_user_id = $1',
      [business_user_id]
    );

    // Check if there are businesses
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No businesses found' });
    }

    // Respond with the list of businesses
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Business by ID
exports.getBusinessById = async (req, res) => {
  const businessId = req.params.id;
  const business_user_id = req.user.user_id;

  try {
      // Query to get the business details by ID
      const result = await pool.query(
          'SELECT business_id, business_name, business_type, created_at FROM Businesses WHERE business_id = $1 AND business_user_id = $2',
          [businessId,business_user_id]
      );

      // If no business is found, return a 404 response
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Business not found' });
      }

      // Return the business details
      res.status(200).json(result.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBusiness = async (req, res) => {
  const { name, business_type } = req.body;

  // Validate request data using Joi
  const { error } = businessSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the user_id from the JWT token
  const business_user_id = req.user.user_id;
  const business_id = req.params.id;

  try {
    // Update the business in the database
    const result = await pool.query(
      'UPDATE Businesses SET business_name = $1, business_type = $2 WHERE business_id = $3 AND business_user_id = $4 RETURNING business_id',
      [name, business_type, business_id, business_user_id]
    );

    // Check if any row was updated
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Business not found or you do not have permission to update this business' });
    }

    // Respond with success message
    res.status(200).json({
      message: 'Business updated successfully',
      business_id: result.rows[0].business_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


