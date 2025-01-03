import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* User Dashboard Card (Linked to UserDashboard) */}
        <Link to="/UserDashboard" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User Dashboard</h2>
          <p className="text-gray-600">Overview of user activity and stats.</p>
        </Link>

        {/* Communication Actions Card */}
       
        <Link to="/CommunicationAction" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Communication Actions</h2>
          <p className="text-gray-600">Manage communications, schedule tasks, and track actions.</p>
       </Link>
        
       

        {/* Notifications Card */}
        <Link to="/NotificationsBar" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
          <p className="text-gray-600">View important alerts and overdue tasks.</p>
        </Link>

        {/* Calendar Card */}
        <Link to="/calendar" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
          <p className="text-gray-600">Manage appointments, deadlines, and events.</p>
          </Link>

      </div>
    </div>
  );
};

export default Dashboard;
