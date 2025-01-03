const Company = require('../models/Company');
const Communication = require('../models/Communication');

// Fetch Dashboard Data
exports.getUserDashboard = async (req, res) => {
  try {
    const companies = await Company.find().populate('communications'); // Populate communication data
    const dashboardData = companies.map((company) => {
      // Get last five communications
      const lastFive = company.communications.slice(-5).map((comm) => ({
        type: comm.type,
        date: comm.date,
      }));

      // Find next scheduled communication
      const nextScheduled = company.communications.find((comm) => comm.date > new Date());

      // Determine the highlight color
      const highlight = !nextScheduled
        ? 'red' // Overdue if no next scheduled communication
        : nextScheduled.date.toDateString() === new Date().toDateString()
        ? 'yellow' // Yellow if it's due today
        : null;

      return {
        companyName: company.name,
        lastFiveCommunications: lastFive,
        nextScheduledCommunication: nextScheduled,
        highlight,
      };
    });

    res.status(200).json(dashboardData); // Send the dashboard data
  } catch (err) {
    res.status(500).json({ error: 'Error fetching dashboard data.' }); // Handle errors
  }
};


  // controllers/userController.js
exports.addCommunication = async (req, res) => {
    const { companyId, type, date, notes } = req.body;
  
    try {
      const communication = new Communication({ companyId, type, date, notes });
      await communication.save();
  
      await Company.findByIdAndUpdate(companyId, {
        $push: { communications: communication._id },
      });
  
      res.status(201).json(communication);
    } catch (err) {
      console.error('Error adding communication:', err);
      res.status(500).json({ error: 'Error adding communication.' });
    }
  };

  

// controllers/userController.js
exports.getNotifications = async (req, res) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
  
      const overdue = await Communication.find({ date: { $lt: new Date() } })
        .populate('companyId')
        .exec();
  
      const dueToday = await Communication.find({ date: { $eq: today } })
        .populate('companyId')
        .exec();
  
      res.status(200).json({ overdue, dueToday });
    } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ error: 'Error fetching notifications.' });
    }
  };
  
  module.exports = router;