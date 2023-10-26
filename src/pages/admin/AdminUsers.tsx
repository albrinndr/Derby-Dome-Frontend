import React from "react";
import SideBar from "../../components/admin/SideBar";
import UserTable from "../../components/admin/UserTable";
import NavBar from "../../components/admin/NavBar";

const AdminUsers = () => {
    return (

        <section className="flex ">
            <SideBar />
            <div className=" text-xl text-gray-900 font-semibold bg-slate-50 w-screen">
                <NavBar />
                <UserTable />
            </div>
        </section>


    );
};

export default AdminUsers;
