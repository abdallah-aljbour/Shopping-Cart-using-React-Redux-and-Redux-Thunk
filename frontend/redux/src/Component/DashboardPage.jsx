import React from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Welcome, {user ? user.email : "Admin"}! Here's an overview of your
            admin panel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">
                User Management
              </h2>
              <p className="text-indigo-700">
                Manage user accounts and permissions
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                Analytics
              </h2>
              <p className="text-purple-700">
                View site statistics and user behavior
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                Content Management
              </h2>
              <p className="text-blue-700">Update and organize site content</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Settings
              </h2>
              <p className="text-green-700">
                Configure system settings and preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
