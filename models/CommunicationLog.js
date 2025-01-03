
const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
  companyId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  communicationType: {
    type: String,  // Change this to String instead of ObjectId
    required: true,
  },
  communicationDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

const CommunicationLog = mongoose.model('CommunicationLog', communicationLogSchema);

// Example query to find communication logs and populate companyId
const getCommunicationLogs = async () => {
  try {
    const logs = await CommunicationLog.find()
      .populate('companyId')  // Populate the companyId field with company details
      .exec();

    console.log('Communication Logs:', logs);
    return logs;
  } catch (error) {
    console.error('Error fetching communication logs:', error);
  }
};

module.exports = CommunicationLog;
