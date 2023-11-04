import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";
import ProfileHeader from "../profile/ProfileHeader";
import ProfileBannerHead from "../profile/ProfileBannerHead";

const ClubProfileHead = () => {
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
        <>
            < NavBar color={isScrolled} fixed={false} />
            <ProfileBannerHead />
            <div className="relative z-10" style={{ marginTop: "-20px" }} >
                <ProfileHeader />
            </div>
            <Outlet />
        </>
    );
};

export default ClubProfileHead;
