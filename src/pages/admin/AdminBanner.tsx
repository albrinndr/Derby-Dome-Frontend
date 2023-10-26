import React from "react";
import Banner from "../../components/admin/stadium/Banner";
import SideBar from "../../components/admin/SideBar";
import NavBar from "../../components/admin/nav/NavBarStadium";

const AdminBanner = () => {
    return (
        <>
            <section className="flex ">
                <SideBar />
                <div className=" text-xl text-gray-900 font-semibold bg-slate-50 w-screen">
                    <NavBar />
                    <Banner />
                </div>
            </section>
        </>
    );
};

export default AdminBanner;
