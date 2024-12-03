// controllers/offers.controller.js
const pool = require('../utils/db');
const Joi = require('@hapi/joi');
const QRCode = require('qrcode');

// Validation schema using Joi
const offerSchema = Joi.object({
  business_id: Joi.number().integer().required(),
  offer_type_id: Joi.number().integer().required(),
  offer_name: Joi.string().max(255).required(),
  description: Joi.string().allow('').optional(),
  visit_threshold: Joi.number().integer().optional(),
  discount_percentage: Joi.number().precision(2).optional(),
  loyalty_points_per_visit: Joi.number().integer().optional(),
  max_redeemable_points: Joi.number().integer().optional(),
  valid_until: Joi.date().iso().optional(),
});

// Generate QR code as a buffer
const generateQRCode = async (data) => {
  try {
    const qrCodeBuffer = await QRCode.toBuffer(data);
    return qrCodeBuffer;
  } catch (error) {
    throw new Error('QR code generation failed');
  }
};

// Create a new offer
const createOffer = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = offerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      business_id,
      offer_type_id,
      offer_name,
      description,
      visit_threshold,
      discount_percentage,
      loyalty_points_per_visit,
      max_redeemable_points,
      valid_until,
    } = value;

    // Generate QR code
    //const qrCode = await generateQRCode(`${offer_name}-${business_id}`);
    
    const qrCode = await generateQRCode(`http://localhost:4200`);

    // Insert offer data into the database
    const insertQuery = `
      INSERT INTO Offers (
        business_id, offer_type_id, offer_name, description, 
        visit_threshold, discount_percentage, loyalty_points_per_visit, 
        max_redeemable_points, valid_until, qr_code
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      business_id,
      offer_type_id,
      offer_name,
      description || null,
      visit_threshold || null,
      discount_percentage || null,
      loyalty_points_per_visit || null,
      max_redeemable_points || null,
      valid_until || null,
      qrCode,
    ];

    const result = await pool.query(insertQuery, values);
    const newOffer = result.rows[0];

    res.status(201).json(newOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

async function getOffersByBusinessId(req, res) {
    const businessId = req.params.businessId;
  
    try {
      const result = await pool.query('SELECT * FROM Offers WHERE business_id = $1', [businessId]);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const deleteOfferById = async (req, res) => {
  const offerId = parseInt(req.params.offer_id); // Get the offer_id from the request parameters

  if (isNaN(offerId)) {
    return res.status(400).json({ message: 'Invalid offer ID' });
  }

  try {
    const result = await pool.query('DELETE FROM Offers WHERE offer_id = $1 RETURNING *', [offerId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    return res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createOffer,
  getOffersByBusinessId,
  deleteOfferById
};
