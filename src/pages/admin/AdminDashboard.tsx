import React from "react";
import Dashboard from "../../components/admin/dashboard/Dashboard";
import NavBar from "../../components/admin/NavBar";

const AdminDashboard = () => {
    return (
        <div className="w-screen bg-gradient-to-r from-rose-50 to-teal-50 ">
            <NavBar />
            <div className="p-4 md:p-14 md:pr-16 min-h-screen">
                <Dashboard />
            </div>
        </div>
    );
};

export default AdminDashboard;
