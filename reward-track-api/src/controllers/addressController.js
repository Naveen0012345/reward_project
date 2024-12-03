// controllers/addressController.js
const pool = require('../utils/db'); // Ensure to require your database connection
const Joi = require('@hapi/joi');

// Define the Joi schema for address validation
const addressSchema = Joi.object({
    address_line_1: Joi.string().max(255).required(),
    address_line_2: Joi.string().max(255).optional().allow(''),
    city: Joi.string().max(100).required(),
    state: Joi.string().max(100).required(),
    postal_code: Joi.string().max(20).required(),
    country: Joi.string().max(100).required(),
    business_id: Joi.number().integer().required() // New field added
  });

const addressController = {
  // Create a new address
  createAddress: async (req, res) => {
    try {
      // Validate request body
      const { error } = addressSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
      const { address_line_1, address_line_2, city, state, postal_code, country, business_id ,customer_id} = req.body;
      const newAddress = await pool.query(
        `INSERT INTO addresses (address_line_1, address_line_2, city, state, postal_code, country, business_id, customer_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [address_line_1, address_line_2, city, state, postal_code, country, business_id, customer_id]
      );
      res.status(201).json(newAddress.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  },

  // Get all addresses
  getAddresses: async (req, res) => {
    try {
      const allAddresses = await pool.query('SELECT * FROM addresses');
      res.json(allAddresses.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  },

  // Get address by ID
  getAddressById: async (req, res) => {
    const { id } = req.params;
    try {
      const address = await pool.query('SELECT * FROM addresses WHERE address_id = $1', [id]);

      if (address.rows.length === 0) {
        return res.status(404).json({ error: 'Address not found' });
      }
      res.json(address.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  },

  // Update an address
  updateAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const { error } = addressSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
      const business_user_id = req.user.user_id;
      const { address_line_1, address_line_2, city, state, postal_code, country, business_id ,customer_id} = req.body;
      const updatedAddress = await pool.query(
        `UPDATE addresses SET 
         address_line_1 = $1, 
         address_line_2 = $2, 
         city = $3, 
         state = $4, 
         postal_code = $5, 
         country = $6, 
         business_id = $7, 
         customer_id = $8, 
         updated_at = NOW()
         WHERE address_id = $9 RETURNING *`,
        [address_line_1, address_line_2, city, state, postal_code, country, business_id, customer_id, id]
      );

      if (updatedAddress.rows.length === 0) {
        return res.status(404).json({ error: 'Address not found' });
      }

      res.json(updatedAddress.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  },

  // Delete an address
  deleteAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedAddress = await pool.query('DELETE FROM addresses WHERE address_id = $1 RETURNING *', [id]);
      if (deletedAddress.rows.length === 0) {
        return res.status(404).json({ error: 'Address not found' });
      }
      res.json({ message: 'Address deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  },
};

module.exports = addressController;
