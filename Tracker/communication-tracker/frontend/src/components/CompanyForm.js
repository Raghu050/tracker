import React, { useEffect, useState } from 'react';

const CompanyForm = ({ company, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: 14,
  });

  useEffect(() => {
    // Populate form when editing
    if (company) {
      setFormData({
        _id: company._id || '', // Include _id for updates
        name: company.name || '',
        location: company.location || '',
        linkedInProfile: company.linkedInProfile || '',
        emails: company.emails ? company.emails.join(', ') : '',
        phoneNumbers: company.phoneNumbers ? company.phoneNumbers.join(', ') : '',
        comments: company.comments || '',
        communicationPeriodicity: company.communicationPeriodicity || 14,
      });
    } else {
      // Reset form for new entry
      setFormData({
        name: '',
        location: '',
        linkedInProfile: '',
        emails: '',
        phoneNumbers: '',
        comments: '',
        communicationPeriodicity: 14,
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      emails: formData.emails.split(',').map((email) => email.trim()),
      phoneNumbers: formData.phoneNumbers.split(',').map((phone) => phone.trim()),
    };
    onSubmit(formattedData); // Pass the data with _id included if editing
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg mx-auto">
      <h2 className="text-lg font-bold">{company ? 'Update Company' : 'Add Company'}</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="linkedInProfile"
        value={formData.linkedInProfile}
        onChange={handleChange}
        placeholder="LinkedIn Profile"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="emails"
        value={formData.emails}
        onChange={handleChange}
        placeholder="Emails (comma-separated)"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="phoneNumbers"
        value={formData.phoneNumbers}
        onChange={handleChange}
        placeholder="Phone Numbers (comma-separated)"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        placeholder="Comments"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <input
        type="number"
        name="communicationPeriodicity"
        value={formData.communicationPeriodicity}
        onChange={handleChange}
        placeholder="Communication Periodicity"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        {company ? 'Update' : 'Add'} Company
      </button>
    </form>
  );
};

export default CompanyForm;
