import React, { useEffect, useState } from 'react';

const CompaniesListPage = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/companies'); // Ensure this URL is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompanies(data); // Store the fetched companies in state
      } catch (error) {
        setError(error.message); // Set the error if the fetch fails
      }
    };

    fetchCompanies(); // Fetch companies when the component mounts
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 text-red-700">
        <p className="text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Companies List</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Company Name</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Phone Numbers</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length > 0 ? (
              companies.map((company) => (
                <tr key={company._id} className="border-b">
                  <td className="px-4 py-2">{company.name}</td>
                  <td className="px-4 py-2">{company.location}</td>
                  <td className="px-4 py-2">{company.emails ? company.emails.join(', ') : 'N/A'}</td>
                  <td className="px-4 py-2">{company.phoneNumbers ? company.phoneNumbers.join(', ') : 'N/A'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => alert(`Details of ${company.name}`)} // Replace this with a detailed view if needed
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">No companies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesListPage;
