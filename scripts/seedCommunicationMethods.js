// backend/scripts/seedCommunicationMethods.js
const mongoose = require('mongoose');
const CommunicationMethod = require('../models/CommunicationMethods');

const defaultMethods = [
  { name: 'LinkedIn Post', description: 'Public post on LinkedIn', sequence: 1, mandatory: false },
  { name: 'LinkedIn Message', description: 'Direct message on LinkedIn', sequence: 2, mandatory: false },
  { name: 'Email', description: 'Send an email to the contact', sequence: 3, mandatory: false },
  { name: 'Phone Call', description: 'Call the contact by phone', sequence: 4, mandatory: false },
  { name: 'Other', description: 'Any other method', sequence: 5, mandatory: false },
];

const seedCommunicationMethods = async () => {
  try {
    for (const method of defaultMethods) {
      const existingMethod = await CommunicationMethod.findOne({ name: method.name });
      if (!existingMethod) {
        await new CommunicationMethod(method).save();
      }
    }
    console.log('Default communication methods have been seeded.');
  } catch (error) {
    console.error('Error seeding communication methods:', error);
  }
};

module.exports = seedCommunicationMethods;
