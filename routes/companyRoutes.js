const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET /api/companies// Assuming this is in your routes file (e.g., companyRoutes.js)

router.get('/', async (req, res) => {
  console.log('Received request for companies');
  try {
    const companies = await Company.find().populate('communications');
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Error fetching companies' });
  }
});


router.post('/', async (req, res) => {
  const { name, location, linkedInProfile, emails, phoneNumbers, comments, communicationPeriodicity, communications } = req.body;

  // Manually check if required fields are provided
  if (!name) {
    return res.status(400).json({ message: 'Company name is required' });
  }

  // Proceed with creating the company if all required fields are valid
  const companyData = {
    name,
    location,
    linkedInProfile,
    emails,
    phoneNumbers,
    comments,
    communicationPeriodicity,
    communications,
  };

  try {
    const company = new Company(companyData);
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(400).json({ message: 'Error creating company', error: error.message });
  }
});



// PUT /api/companies/:id
router.put('/:id', async (req, res) => {  // Match this route with '/:id'
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/companies/:id
const mongoose = require('mongoose');

router.delete('/:id', async (req, res) => {  // Same here, ':' should be used to define dynamic routes
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid company ID format' });
    }

    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully', deletedCompany });
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/companies/:id/communications// routes/companyRoutes.js

// Route to add communication methods to a company
router.put('/:id/communications', async (req, res) => {
  const { id } = req.params;
  const { communicationIds } = req.body; // Expecting an array of communication method IDs

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Update the company's communications with the selected communication methods
    company.communications = communicationIds;

    // Save the updated company
    await company.save();

    res.status(200).json(company);
  } catch (error) {
    console.error('Error updating communications:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


