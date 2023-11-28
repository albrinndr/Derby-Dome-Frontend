import React, { useState, useEffect } from "react";
import NavBarFull from "../../components/club/navbar/NavBarFull";
import Dashboard from "../../components/club/dashboard/Dashboard";

const ClubDashboard = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div>
            <div className="">
                < NavBarFull color={isScrolled} dashboard />
            </div>
            <div className="p-5 md:px-14 relative z-10" style={{ marginTop: "-50px" }} >
                <Dashboard />
            </div>


        </div>
    );
};

export default ClubDashboard;
