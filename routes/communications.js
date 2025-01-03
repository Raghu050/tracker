const express = require('express');
const router = express.Router();
const CommunicationLog = require('../models/CommunicationLog');

// API route to get all communications (past and future)
router.get('/communications', async (req, res) => {
    try {
      const logs = await CommunicationLog.find()
        .select('communicationType communicationDate notes')
        .exec();
      res.status(200).json(logs);
    } catch (error) {
      console.error('Error fetching communication logs:', error);
      res.status(500).json({ message: 'Error fetching communication logs' });
    }
  });
  

module.exports = router;
