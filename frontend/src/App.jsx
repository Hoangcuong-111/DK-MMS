import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Toast from './components/ui/Toast';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <div className="flex h-[calc(100vh-80px)]">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="max-w-full px-6 py-8">
              <Dashboard />
            </div>
          </main>
        </div>
        <Toast />
      </div>
    </ThemeProvider>
  );
}

export default App;