const pool = require('../utils/db');
const Joi = require('@hapi/joi');


// Define the Joi schema for validation
const serviceSchema = Joi.object({
  business_id: Joi.number().integer().required().messages({
    'number.base': 'Business ID must be a number',
    'number.empty': 'Business ID is required',
    'any.required': 'Business ID is required'
  }),
  service_name: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Service name is required',
    'string.max': 'Service name cannot exceed 100 characters',
    'any.required': 'Service name is required'
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required'
  })
});

// Add a new service to a business
exports.addService = async (req, res) => {
  const { business_id, service_name, price } = req.body;

  // Validate the incoming data using Joi
  const { error } = serviceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Insert the new service into the Services table
    const result = await pool.query(
      'INSERT INTO Services (business_id, service_name, price) VALUES ($1, $2, $3) RETURNING service_id',
      [business_id, service_name, price]
    );

    const service_id = result.rows[0].service_id;

    // Respond with success message and the new service ID
    res.status(201).json({
      message: 'Service added successfully',
      service_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getServiceById = async (req, res) => {
  const service_id = req.params.id;

  try {
    // Query the database to get the service details
    const result = await pool.query(
      'SELECT service_id, business_id, service_name, price, created_at FROM Services WHERE service_id = $1',
      [service_id]
    );

    // If no service is found, return a 404 response
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Return the service details
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Define the Joi schema for validating the service update
const updateServiceSchema = Joi.object({
  service_name: Joi.string().min(1).max(100).optional().messages({
    'string.empty': 'Service name cannot be empty',
    'string.max': 'Service name cannot exceed 100 characters'
  }),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number'
  })
}).or('service_name', 'price'); // At least one of these fields must be present

// Update a specific service by ID
exports.updateService = async (req, res) => {
  const service_id = req.params.id;
  const { service_name, price } = req.body;

  // Validate the request data using Joi
  const { error } = updateServiceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Build the SQL update statement dynamically based on the fields provided
    let updateFields = [];
    let updateValues = [];
    let queryIndex = 1;

    if (service_name) {
      updateFields.push(`service_name = $${queryIndex}`);
      updateValues.push(service_name);
      queryIndex++;
    }

    if (price) {
      updateFields.push(`price = $${queryIndex}`);
      updateValues.push(price);
      queryIndex++;
    }

    // If no fields to update, return a 400 response
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    // Add the service_id to the values array for the WHERE clause
    updateValues.push(service_id);

    // Construct the SQL query
    const query = `UPDATE Services SET ${updateFields.join(', ')} WHERE service_id = $${queryIndex} RETURNING service_id`;

    // Execute the query
    const result = await pool.query(query, updateValues);

    // If no rows were updated, return a 404 response
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Respond with a success message
    res.status(200).json({
      message: 'Service updated successfully',
      service_id: result.rows[0].service_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a specific service by ID
exports.deleteService = async (req, res) => {
  const service_id = req.params.id;

  try {
    // Execute the SQL query to delete the service
    const result = await pool.query(
      'DELETE FROM Services WHERE service_id = $1 RETURNING service_id',
      [service_id]
    );

    // If no rows were deleted, return a 404 response
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Respond with a success message
    res.status(200).json({
      message: 'Service deleted successfully',
      service_id: result.rows[0].service_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all services for a specific business by business ID
exports.getServicesByBusinessId = async (req, res) => {
  const business_id = req.params.id;

  try {
    // Execute the SQL query to retrieve services for the specified business
    const result = await pool.query(
      'SELECT service_id, service_name, price, created_at FROM Services WHERE business_id = $1',
      [business_id]
    );

    // Check if any services were found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No services found for this business' });
    }

    // Respond with the list of services
    res.status(200).json({
      message: 'Services retrieved successfully',
      services: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

