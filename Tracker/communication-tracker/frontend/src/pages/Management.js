import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CompanyForm from '../components/CompanyForm';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const addCompany = async (companyData) => {
    try {
      const response = await axios.post('http://localhost:5001/api/companies', companyData);
      setCompanies([...companies, response.data]);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const updateCompany = async (companyData) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/companies/${companyData._id}`, companyData);
      setCompanies(companies.map(company => company._id === companyData._id ? response.data : company));
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/companies/${id}`);
      setCompanies(companies.filter(company => company._id !== id));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleSubmit = (companyData) => {
    if (companyData._id) {
      updateCompany(companyData); // Update existing company
    } else {
      addCompany(companyData); // Add new company
    }
    setSelectedCompany(null); // Clear the selected company
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Company Management</h1>
      <CompanyForm company={selectedCompany} onSubmit={handleSubmit} />
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto bg-white border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Location</th>
              <th className="px-4 py-2 border text-left">Contact</th>
              <th className="px-4 py-2 border text-left">Phone Numbers</th>
              <th className="px-4 py-2 border text-left">Comments</th>
              <th className="px-4 py-2 border text-left">Communication Periodicity</th>
              <th className="px-4 py-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{company.name}</td>
                <td className="px-4 py-2 border">{company.location}</td>
                <td className="px-4 py-2 border">{company.emails ? company.emails.join(', ') : 'N/A'}</td>
                <td className="px-4 py-2 border">{company.phoneNumbers ? company.phoneNumbers.join(', ') : 'N/A'}</td>
                <td className="px-4 py-2 border">{company.comments || 'No comments available'}</td>
                <td className="px-4 py-2 border">{company.communicationPeriodicity} days</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCompany(company._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyManagement;
