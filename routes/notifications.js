const express = require('express');
const router = express.Router();
const CommunicationLog = require('../models/CommunicationLog');

// GET notifications
router.get('/notifications', async (req, res) => {
  try {
    const currentDate = new Date();

    const overdueLogs = await CommunicationLog.find({
      communicationDate: { $lt: currentDate },
    }).populate('companyId');

    const dueLogs = await CommunicationLog.find({
      communicationDate: {
        $gte: currentDate,
        $lte: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    }).populate('companyId');

    res.status(200).json({ overdue: overdueLogs, upcoming: dueLogs });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

module.exports = router;
