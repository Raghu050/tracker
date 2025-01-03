import React, { useState, useEffect } from 'react';
import CompanyForm from './CompanyForm';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // For editing

  // Fetch companies
  const fetchCompanies = async () => {
    const response = await fetch('/api/companies');
    const data = await response.json();
    setCompanies(data);
  };

  // Handle submit
  const handleSubmit = async (company) => {
    if (selectedCompany) {
      // Update the existing company
      await fetch(`/api/companies/${selectedCompany._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company),
      });
    } else {
      // Create a new company
      await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company),
      });
    }

    fetchCompanies(); // Refresh the list
    setSelectedCompany(null); // Clear selected company
  };

  // Handle delete
  const handleDelete = async (id) => {
    await fetch(`/api/companies/${id}`, { method: 'DELETE' });
    fetchCompanies(); // Refresh the list
  };

  // Handle edit
  const handleEdit = (company) => {
    setSelectedCompany(company); // Populate the form with the company data
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <h1>Company List</h1>
      <CompanyForm company={selectedCompany} onSubmit={handleSubmit} />
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            <strong>{company.name}</strong> - {company.location}
            <button onClick={() => handleEdit(company)}>Edit</button>
            <button onClick={() => handleDelete(company._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
