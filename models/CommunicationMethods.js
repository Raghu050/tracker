// models/CommunicationMethods.js
const mongoose = require('mongoose');

const communicationMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Ensures name is always provided
  },
  description: {
    type: String,  // Optional description
    default: '',  // Default value for description if not provided
  },
  sequence: {
    type: String,
    required: true,  // Sequence number is required
    unique: true,    // Optional: Make sure sequence is unique (if needed)
  },
  mandatory: {
    type: Boolean,
    default: false, // Default to false, optional field
  },
  date: {
    type: Date, // The date field, make sure it works as expected
    // If you want to set it to current date by default
  },
});

// Create model for CommunicationMethods based on the schema
const CommunicationMethods = mongoose.model('CommunicationMethods', communicationMethodSchema);

module.exports = CommunicationMethods;
