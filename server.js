const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const companyRoutes = require('./routes/companyRoutes');
const communicationMethodRoutes = require('./routes/communicationMethodRoutes');
const communication = require('./routes/communicationLogs');
const bodyParser = require('body-parser');
const resetHighlightsRoutes = require('./routes/resetHighlights');
const communicationLogsRoutes = require('./routes/communicationLogs');
const notificationsRoutes = require('./routes/notifications');
const communicationRoutes = require('./routes/communications');




const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', resetHighlightsRoutes); // Ensure this line is present
app.use('/api', communicationRoutes); 

// Use the routes for companies and communication methods
app.use('/api/companies', companyRoutes);  // This is crucial, it maps the routes
app.use('/api/communication-methods', communicationMethodRoutes); // Communication methods routes
// POST route to log communication
app.use('/api/communications', communication);
app.use('/api/logs', communicationLogsRoutes);
app.use('/api', notificationsRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('Database connection error:', err);
});

mongoose.connection.once('open', async () => {
  console.log('Connected to the database');
  
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
