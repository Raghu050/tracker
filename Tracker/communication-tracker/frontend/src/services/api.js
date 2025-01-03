// src/services/api.js
import axios from 'axios';

export const getCompanies = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/companies');
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};
