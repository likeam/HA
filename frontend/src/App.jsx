// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import POSPage from "./pages/POSPage";
import InventoryPage from "./pages/InventoryPage";
import BillsPage from "./pages/BillsPage";
import SyncPage from "./pages/SyncPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import OfflineStatus from "./components/OfflineStatus";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <OfflineStatus />

          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/pos" element={<POSPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/bills" element={<BillsPage />} />
              <Route path="/sync" element={<SyncPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
