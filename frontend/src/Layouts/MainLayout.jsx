import React from 'react';
import Header from '../components/SharedComponent/Header';
import Sidebar from '../components/SharedComponent/Sidebar';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <Header />
    <div className="flex h-[calc(100vh-80px)]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  </div>
);

export default MainLayout;
