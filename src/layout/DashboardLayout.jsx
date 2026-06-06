import React, { useState } from "react"; 
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { loading } = useAuthContext();

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Mobile Header (Yahan button hona chahiye) */}
        <header className="md:hidden bg-white p-4 shadow-sm">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;