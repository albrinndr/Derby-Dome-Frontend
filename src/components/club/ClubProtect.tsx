import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from "react";
import NavBar from "./navbar/NavBar";
import ProfileBannerHead from "./profile/ProfileBannerHead";
import ProfileHeader from "./profile/ProfileHeader";


interface RootState {
    auth: {
        cLoggedIn: boolean;
    };
}

const ClubProtect = () => {
    const { cLoggedIn } = useSelector((state: RootState) => state.auth);
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const location = useLocation();
    const isProfile = location.pathname.startsWith("/club/profile");
    return (
        cLoggedIn ?
            <div className="bg-slate-200 bg-opacity-50 min-h-screen min-w-fit">
                <NavBar color={isScrolled} fixed={false} />
                {isProfile && <ProfileBannerHead />}
                {isProfile && <div className="relative z-10" style={{ marginTop: "-20px" }} >
                    <ProfileHeader />
                </div>}
                <Outlet />

            </div>
            : <Navigate to='/club/login' replace />
    );

};

export default ClubProtect;
