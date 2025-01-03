// routes/resetHighlights.js
const express = require('express');
const router = express.Router();
const Company = require('../models/Company'); // Adjust the path if necessary


// Example route to reset highlights for selected companies
router.put('/reset-highlights', async (req, res) => {
  const { companies } = req.body;

  if (!companies || companies.length === 0) {
    return res.status(400).json({ message: 'Companies are required.' });
  }

  try {
    // Implement logic to reset highlights (e.g., in a 'company' collection)
    // Assuming a "highlight" field exists for each company
    await Company.updateMany(
      { _id: { $in: companies } },
      { $set: { highlight: 'none' } }
    );

    res.status(200).json({ message: 'Highlights reset successfully' });
  } catch (error) {
    console.error('Error resetting highlights:', error);
    res.status(500).json({ message: 'Error resetting highlights' });
  }
});

module.exports = router;
