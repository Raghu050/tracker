// CommunicationAction.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CommunicationAction = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationType, setCommunicationType] = useState('');
  const [communicationDate, setCommunicationDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch companies when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  // Handle company selection (multi-select)
  const handleCompanyChange = (e) => {
    const { options } = e.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedCompanies(selectedValues);
  };

  // Handle communication type change
  const handleCommunicationTypeChange = (e) => {
    setCommunicationType(e.target.value);
  };

  // Handle notes input change
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // Handle communication date change
  const handleDateChange = (date) => {
    setCommunicationDate(date);
  };

  // Handle form submission for logging communication
  const handleCommunicationSubmit = async () => {
    if (selectedCompanies.length === 0 || !communicationType || !notes) {
      alert('Please select companies, communication type, and enter notes.');
      return;
    }

    try {
      // Submit the communication data
      await axios.post('http://localhost:5001/api/communications/log-communication', {
        companies: selectedCompanies,
        communicationType,
        communicationDate,
        notes,
      });
      

      // Reset highlights (red or yellow) for the selected companies
      await axios.put('http://localhost:5001/api/reset-highlights', {
        companies: selectedCompanies,
      });

      alert('Communication logged successfully!');
      setModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error logging communication:', error);
      alert('Error logging communication');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Communication Actions</h1>

      {/* Select Companies */}
      <div className="mb-6">
        <label className="block text-gray-1000">Select Companies:</label>
        <select
          multiple
          value={selectedCompanies}
          onChange={handleCompanyChange}
          className="p-10 border rounded w-full"
        >
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {/* Button to open the communication modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Log New Communication
      </button>

      {/* Modal for logging communication */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Log Communication</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Communication Type:</label>
              <input
                type="text"
                value={communicationType}
                onChange={handleCommunicationTypeChange}
                className="p-2 border rounded w-full"
                placeholder="e.g., LinkedIn Post, Email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Communication Date:</label>
              <DatePicker
                selected={communicationDate}
                onChange={handleDateChange}
                className="p-2 border rounded w-full"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Notes:</label>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                className="p-2 border rounded w-full"
                placeholder="Enter additional notes about the communication"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCommunicationSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationAction;
