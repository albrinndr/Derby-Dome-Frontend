import React from "react";
import SideBar from "../../components/admin/SideBar";
import UserTable from "../../components/admin/UserTable";
import NavBarStadium from "../../components/admin/nav/NavBarStadium";

const AdminUsers = () => {
    return (

        <section className="flex ">
            <SideBar />
            <div className=" text-xl text-gray-900 font-semibold bg-slate-50 w-screen">
                <NavBarStadium />
                <UserTable />
            </div>
        </section>


    );
};

export default AdminUsers;
