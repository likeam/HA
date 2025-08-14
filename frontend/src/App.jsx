import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { initSync } from "./services/syncService";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import POS from "./pages/POS";
import Sales from "./pages/Sales";
import Settings from "./pages/Settings";
import OfflineProvider from "./contexts/OfflineContext";

const AppWrapper = () => {
  // Initialize network status monitoring
  useNetworkStatus();

  // Initialize data sync
  React.useEffect(() => {
    initSync();
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/pos" element={<POS />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <OfflineProvider>
        <AppWrapper />
      </OfflineProvider>
    </Provider>
  );
};

export default App;
