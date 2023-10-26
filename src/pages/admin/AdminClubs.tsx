import React from "react";
import ClubTable from "../../components/admin/ClubTable";
import SideBar from "../../components/admin/SideBar";
import NavBar from "../../components/admin/NavBar";

const AdminClubs = () => {
    return (
        <>
            <section className="flex ">
                <SideBar />
                <div className=" text-xl text-gray-900 font-semibold bg-slate-50 w-screen">
                    <NavBar />
                    <ClubTable />
                </div>
            </section>
        </>
    );
};

export default AdminClubs;
