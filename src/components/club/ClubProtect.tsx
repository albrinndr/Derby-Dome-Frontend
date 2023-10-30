import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from "react";
import Navbar from "./navbar/NavBarFull";


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
    return (
        cLoggedIn ?
            <div className="bg-slate-200 bg-opacity-50 min-h-screen">
                <Navbar color={!isScrolled} fixed />

                <Outlet />

            </div>
            : <Navigate to='/club/login' replace />
    );

};

export default ClubProtect;
