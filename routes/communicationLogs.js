const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const CommunicationLog = require('../models/CommunicationLog');
const Company = require('../models/Company');

// POST route for logging communication
router.post('/log-communication', async (req, res) => {
  const { companies, communicationType, communicationDate, notes } = req.body;

  try {
    // Validate communicationType
    if (!communicationType || typeof communicationType !== 'string') {
      return res.status(400).json({ message: 'Invalid communication type' });
    }

    // Validate companies (ensure they are an array of valid ObjectIds)
    if (!Array.isArray(companies) || companies.some(companyId => !mongoose.Types.ObjectId.isValid(companyId))) {
      return res.status(400).json({ message: 'Invalid company IDs' });
    }

    // Create a new communication log
    const newLog = new CommunicationLog({
      companyId: companies,  // Store the company IDs as an array
      communicationType,     // Store the communicationType as a string
      communicationDate,
      notes,
    });

    // Save the communication log
    await newLog.save();

    // Optionally update the company actions
    await Company.updateMany(
      { _id: { $in: companies } },
      { $push: { actions: newLog._id } }
    );

    res.status(201).json({ message: 'Communication logged successfully' });
  } catch (error) {
    console.error('Error logging communication:', error);
    res.status(500).json({ message: 'Error logging communication' });
  }
});

// GET route to fetch communication logs for a specific company
router.get('/company/:companyId', async (req, res) => {
  const { companyId } = req.params;

  try {
    // Convert companyId to ObjectId (make sure to use 'new')
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const objectId = new mongoose.Types.ObjectId(companyId);

    // Fetch logs using the converted ObjectId
    const logs = await CommunicationLog.find({ companyId: objectId })
      .populate('companyId')  // Populate the company data
      // Uncomment if you need to populate communicationMethod
      // .populate('communicationMethod')
      .exec();

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching communication logs for company:', error);
    res.status(500).json({ message: 'Error fetching communication logs for the company' });
  }
});

module.exports = router;
