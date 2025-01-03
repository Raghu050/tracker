const CommunicationMethods = require('../models/CommunicationMethods');

// Add a new communication method
exports.addCommunicationMethods = async (req, res) => {
  const { name, description, sequence, mandatory } = req.body;
  try {
    const communicationMethods = new CommunicationMethods({
      name,
      description,
      sequence,
      mandatory,
    });
    
    // Save the instance, not the model
    await communicationMethods.save();
    
    res.status(201).json(communicationMethods);
  } catch (error) {
    console.error('Error creating communication method:', error);
    res.status(500).json({ error: 'Failed to create communication method.' });
  }
};

// Get all communication methods
exports.getAllCommunicationMethods = async (req, res) => {
  try {
    const methods = await CommunicationMethods.find().sort({ sequence: 1 });
    res.status(200).json(methods);
  } catch (error) {
    console.error('Error fetching communication methods:', error);
    res.status(500).json({ error: 'Failed to fetch communication methods.' });
  }
};

// Update a communication method
exports.updateCommunicationMethods = async (req, res) => {
  const { id } = req.params;
  const { name, description, sequence, mandatory } = req.body;

  try {
    const updatedMethod = await CommunicationMethods.findByIdAndUpdate(
      id,
      { name, description, sequence, mandatory },
      { new: true }
    );
    if (!updatedMethod) {
      return res.status(404).json({ error: 'Communication method not found.' });
    }
    res.status(200).json(updatedMethod);
  } catch (error) {
    console.error('Error updating communication method:', error);
    res.status(500).json({ error: 'Failed to update communication method.' });
  }
};

// Delete a communication method
exports.deleteCommunicationMethods = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMethod = await CommunicationMethods.findByIdAndDelete(id);
    if (!deletedMethod) {
      return res.status(404).json({ error: 'Communication method not found.' });
    }
    res.status(200).json({ message: 'Communication method deleted successfully.' });
  } catch (error) {
    console.error('Error deleting communication method:', error);
    res.status(500).json({ error: 'Failed to delete communication method.' });
  }
};
