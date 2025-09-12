import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import React, { Suspense, lazy } from 'react';
const EquipmentCatalog = lazy(() => import('../pages/EquipmentCatalog'));
const IncidentReport = lazy(() => import('../pages/IncidentReport'));
const InventoryManagement = lazy(() => import('../pages/InventoryManagement'));
const MaintenanceOrders = lazy(() => import('../pages/MaintenanceOrders'));
const MaintenanceSchedule = lazy(() => import('../pages/MaintenanceSchedule'));
import Toast from './components/ui/Toast';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Header />
            <div className="flex h-[calc(100vh-80px)]">
              <Sidebar />
              <main className="flex-1 overflow-auto">
                <div className="max-w-full px-6 py-8">
                  <Suspense fallback={<div className="text-center py-12">Đang tải trang...</div>}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/equipment" element={<EquipmentCatalog />} />
                      <Route path="/incidents" element={<IncidentReport />} />
                      <Route path="/inventory" element={<InventoryManagement />} />
                      <Route path="/maintenance-orders" element={<MaintenanceOrders />} />
                      <Route path="/maintenance-schedule" element={<MaintenanceSchedule />} />
                    </Routes>
                  </Suspense>
                </div>
              </main>
            </div>
            <Toast />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;