const express = require('express');
const router = express.Router();
const communicationMethodController = require('../controllers/communicationMethodController'); // Correct import for controller

// Route to add a new communication method
router.post('/', communicationMethodController.addCommunicationMethods);

// Route to get all communication methods
router.get('/', communicationMethodController.getAllCommunicationMethods);

// Route to update a specific communication method
router.put('/:id', communicationMethodController.updateCommunicationMethods);

// Route to delete a specific communication method
router.delete('/:id', communicationMethodController.deleteCommunicationMethods);

module.exports = router;
