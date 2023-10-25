import React, { useState } from "react";
import SignUp from "../../components/club/SignUp";
import NavBar from "../../components/user/NavBar";

const ClubSignUp = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <div>
            <NavBar color={!isScrolled} fixed />
            <SignUp />
        </div>
    );
};

export default ClubSignUp;
