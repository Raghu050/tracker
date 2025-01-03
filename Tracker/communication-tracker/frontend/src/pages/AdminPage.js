import React from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold">Admin Page</h2>
      <div className="mt-6">
        <h3 className="text-xl mb-4">Manage Communications and Companies</h3>

        {/* Flex container to place items in a row */}
        <div className="flex space-x-4">
          {/* Card Box for each link */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-2xl font-semibold mb-4">Companies List</h4>
            <Link
              to="/companies"
              className="block text-blue-500 hover:underline p-3 rounded-md hover:bg-gray-100"
            >
              View Companies
            </Link>
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-2xl font-semibold mb-4">Manage Companies</h4>
            <Link
              to="/admin/companies"
              className="block text-blue-500 hover:underline p-3 rounded-md hover:bg-gray-100"
            >
              Manage Companies
            </Link>
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-2xl font-semibold mb-4">Communications</h4>
            <Link
              to="/admin/communication-methods"
              className="block text-blue-500 hover:underline p-3 rounded-md hover:bg-gray-100"
            >
              Manage communication
            </Link>
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-2xl font-semibold mb-4">Settings</h4>
            <Link
              to="/admin/settings"
              className="block text-blue-500 hover:underline p-3 rounded-md hover:bg-gray-100"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
