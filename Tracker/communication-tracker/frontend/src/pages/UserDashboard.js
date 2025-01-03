import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotificationsBar from '../components/NotificationsBar';


const UserDashboard = () => {
  const [companies, setCompanies] = useState([]);  // List of companies
  const [logs, setLogs] = useState([]);  // Communication logs for the selected company
  const [loading, setLoading] = useState(true);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesResponse = await axios.get('http://localhost:5001/api/companies');
        setCompanies(companiesResponse.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch logs for a specific company
  const fetchLogs = async (companyId) => {
    try {
      const logsResponse = await axios.get(`http://localhost:5001/api/logs/company/${companyId}`)

      setLogs(logsResponse.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Function to format the date
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
     <div className="user-dashboard">
    <NotificationsBar />
    {/* Other dashboard components */}
  
    <div className="container mx-auto p-8">
      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Select a Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() => fetchLogs(company._id)}  // Fetch logs when company is clicked
              >
                <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
                <p className="text-gray-600">{company.location}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">Communication Logs</h3>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="font-medium text-gray-700">Method: {log.communicationType}</p>
                  <p className="text-gray-500">Date: {formatDate(log.communicationDate)}</p>
                  <p className="text-gray-500">Notes: {log.notes}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No communication logs available</p>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default UserDashboard;
