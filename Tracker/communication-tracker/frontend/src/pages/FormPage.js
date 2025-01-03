import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FormPage = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: 14, // Default value
  });
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        alert('Company added successfully');
        navigate('/companies'); // Redirect to Companies List page
        setCompanyData({
          name: '',
          location: '',
          linkedInProfile: '',
          emails: '',
          phoneNumbers: '',
          comments: '',
          communicationPeriodicity: 14,
        });
      } else {
        alert('Failed to add company');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add company');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Add a New Company</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={companyData.location}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
          <input
            type="text"
            name="linkedInProfile"
            value={companyData.linkedInProfile}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Emails (comma separated)</label>
          <input
            type="text"
            name="emails"
            value={companyData.emails}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Numbers (comma separated)</label>
          <input
            type="number"
            name="phoneNumbers"
            value={companyData.phoneNumbers}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Comments</label>
          <textarea
            name="comments"
            value={companyData.comments}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Communication Periodicity (in days)</label>
          <input
            type="number"
            name="communicationPeriodicity"
            value={companyData.communicationPeriodicity}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div> */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
