const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  linkedInProfile: {
    type: String,
    trim: true,
  },
  emails: [{
    type: String,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  }],
  phoneNumbers: [{
    type: Number,
    trim: true,
  }],
  comments: {
    type: String,
    trim: true,
  },
  communicationPeriodicity: {
    type: Number,
    default: 14,
    min: [1, 'Communication Periodicity must be at least 1 day'],
    max: [365, 'Communication Periodicity must be less than or equal to 365 days'],
  },
  communications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommunicationMethods',
  }],
  actions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommunicationLog',
  }],
  highlight: { type: String, default: 'none' },
});

// Example method to populate communications
companySchema.methods.getPopulatedCommunications = async function () {
  return await this.populate('communications').execPopulate();
};
companySchema.methods.getPopulatedCommunicationlog = async function () {
  return await this.populate('actions').execPopulate(); // Populate actions, not communicationLog
};

module.exports = mongoose.model('Company', companySchema);
