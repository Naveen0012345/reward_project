// controllers/offers.controller.js
const pool = require('../utils/db');



async function getOfferTypes(req, res) {
    const businessId = req.params.businessId;
  
    try {
      const result = await pool.query('SELECT * FROM OfferTypes');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
  getOfferTypes
};
