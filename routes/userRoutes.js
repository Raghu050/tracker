// routes/userRoutes.js
const express = require('express');
const { getUserDashboard, addCommunication, getNotifications } = require('../controllers/userController');

const router = express.Router();

// User Module Endpoints
router.get('/dashboard', userController.getUserDashboard);
router.post('/communication', addCommunication); // Add communication
router.get('/notifications', getNotifications); // Get notifications

module.exports = router;
