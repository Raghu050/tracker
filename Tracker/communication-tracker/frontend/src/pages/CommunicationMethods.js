import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CommunicationMethods = () => {
  const [methods, setMethods] = useState([]); // Available communication methods
  const [companies, setCompanies] = useState([]); // List of companies
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(''); // Company ID for selection
  const [selectedMethods, setSelectedMethods] = useState([]); // Selected communication methods
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: '',
  });
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [editData, setEditData] = useState({}); // State for data to be edited

  // Fetch communication methods and companies on component mount
  useEffect(() => {
    const fetchMethodsAndCompanies = async () => {
      try {
        const [methodsResponse, companiesResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/communication-methods'),
          axios.get('http://localhost:5001/api/companies'),
        ]);
        setMethods(methodsResponse.data);
        setCompanies(companiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMethodsAndCompanies();
  }, []);

  // Handle company selection
  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  // Handle method selection (checkbox)
  const handleMethodChange = (e) => {
    const methodId = e.target.value;
    setSelectedMethods((prev) =>
      e.target.checked
        ? [...prev, methodId]
        : prev.filter((id) => id !== methodId)
    );
  };

  // Handle input changes for new communication method
  const handleNewMethodChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMethod((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle adding new communication method
  const handleAddNewCommunication = async () => {
    const { name, description, sequence, mandatory } = newMethod;
    if (!name || !description || !sequence) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/communication-methods', {
        name,
        description,
        sequence,
        mandatory,
      });

      const newCommunication = response.data;
      setMethods((prev) => [...prev, newCommunication]);
      setNewMethod({ name: '', description: '', sequence: '', mandatory: '' });

      alert('New communication method added');
    } catch (error) {
      console.error('Error adding communication method:', error);
      alert('Error adding communication method');
    }
  };

  const handleAddCommunication = async () => {
    if (!selectedCompany || selectedMethods.length === 0) {
      alert('Please select a company and communication methods');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5001/api/companies/${selectedCompany}/communications`,
        { communicationIds: selectedMethods }
      );
      console.log('Methods associated with company:', response.data);
      alert('Communication methods associated with the company');
    } catch (error) {
      console.error('Error associating methods:', error);
      alert('Error associating communication methods');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Communication Method Management</h1>

      {/* Add Communication Methods to Company */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Communication Methods to a Company</h2>

        {/* Dropdown to select company */}
        <div className="mb-4">
          <label className="block text-gray-700">Select Company:</label>
          <select
            value={selectedCompany}
            onChange={handleCompanyChange}
            className="p-2 border rounded w-full"
          >
            <option value="">-- Select Company --</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* List of communication methods */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Communication Methods:</h3>
          {methods.map((method) => (
            <label key={method._id} className="block text-gray-700 mb-2">
              <input
                type="checkbox"
                value={method._id}
                onChange={handleMethodChange}
                className="mr-2"
              />
              {method.name}
            </label>
          ))}
        </div>

        <button
          onClick={handleAddCommunication}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Communication to Company
        </button>
      </div>

      {/* Add New Communication Method */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Communication Method</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={newMethod.name}
            onChange={handleNewMethodChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <input
            type="text"
            name="description"
            value={newMethod.description}
            onChange={handleNewMethodChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Sequence:</label>
          <input
            type="text"
            name="sequence"
            value={newMethod.sequence}
            onChange={handleNewMethodChange}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="mandatory"
              checked={newMethod.mandatory}
              onChange={handleNewMethodChange}
              className="mr-2"
            />
            Mandatory
          </label>
        </div>

        <button
          onClick={handleAddNewCommunication}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Communication Method
        </button>
      </div>

      {/* Communication Methods Table */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Sequence</th>
                <th className="py-3 px-4 border-b">Mandatory</th>
                <th className="py-3 px-4 border-b">Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {methods.map((method) => (
                <tr key={method._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{method.name}</td>
                  <td className="py-3 px-4 border-b">{method.description}</td>
                  <td className="py-3 px-4 border-b">{method.sequence}</td>
                  <td className="py-3 px-4 border-b">{method.mandatory ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-4 border-b space-x-2">
                    {/* Edit and Delete buttons */}
                   
                    <button
                      onClick={async () => {
                        try {
                          await axios.delete(`http://localhost:5001/api/communication-methods/${method._id}`);
                          setMethods(methods.filter((m) => m._id !== method._id));
                        } catch (error) {
                          console.error('Error deleting communication method:', error);
                        }
                      }}
                      className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethods;
