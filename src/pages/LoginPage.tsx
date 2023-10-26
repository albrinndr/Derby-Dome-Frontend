// import Login from "../components/common/Login";
import UserLogin from "../components/user/Login";
import ClubLogin from "../components/club/Login";
import NavBar from "../components/user/NavBar";
import React, { useState } from "react";

interface User {
    user?: string;
}
const LoginPage: React.FC<User> = ({ user }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <>
            <NavBar color={!isScrolled} fixed />
            {/* <Login type={user}/> */}
            {user === 'club' ? <ClubLogin /> : <UserLogin />}
        </>
    );
};

export default LoginPage;
