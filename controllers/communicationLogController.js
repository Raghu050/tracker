// const mongoose = require('mongoose');
// const CommunicationLog = require('./models/CommunicationLog');
// const CommunicationMethod = require('./models/CommunicationMethod');

// // Controller function to log communication
// const logCommunication = async (req, res) => {
//   try {
//     const { companies, communicationMethod, communicationDate, notes } = req.body;

//     // Validate communication method ObjectId
//     if (!mongoose.Types.ObjectId.isValid(communicationMethod)) {
//       return res.status(400).json({ message: 'Invalid communication type' });
//     }

//     // Check if the communication method exists in the database
//     const method = await CommunicationMethod.findById(communicationMethod);
//     if (!method) {
//       return res.status(400).json({ message: 'Invalid communication type' });
//     }

//     // Iterate over the companies array and create a log for each company
//     const communicationLogs = companies.map((companyId) => {
//       return new CommunicationLog({
//         companyId,  // Set companyId for each company in the array
//         communicationMethod,  // Single communication method for all
//         communicationDate,
//         notes,
//       });
//     });

//     // Save all the communication logs in the database
//     await CommunicationLog.insertMany(communicationLogs);
//     res.status(201).json({ message: 'Communications logged successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error logging communication' });
//   }
// };

// module.exports = { logCommunication };
