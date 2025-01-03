// frontend/src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CalendarView from './pages/CalendarView'; // Import the CalendarView component
import Navbar from './components/Navbar';
import NotificationsBar from './components/NotificationsBar';
import AdminPage from './pages/AdminPage';
import CommunicationAction from './pages/CommunicationAction';
import CommunicationMethods from './pages/CommunicationMethods'; // Import the CommunicationMethods component
import CompaniesListPage from './pages/CompaniesListPage';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import CompanyManagement from './pages/Management';
import UserDashboard from './pages/UserDashboard'; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/companies" element={<CompaniesListPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/NotificationsBar" element={<NotificationsBar />} />
        <Route path="/admin/companies" element={<CompanyManagement />} />
        <Route path="/admin/communication-methods" element={<CommunicationMethods />} />
        <Route path="/CommunicationAction" element={<CommunicationAction />} />
        <Route path="/calendar" element={<CalendarView />} /> {/* Add Calendar View to a route */}
      </Routes>
    </Router>
  );
};

export default App;
