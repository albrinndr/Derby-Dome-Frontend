import React from "react";
import Logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="bg-white shadow sticky top-0  py-4 z-10 px-4 md:px-14">
            <Link to="/admin"> <img src={Logo} alt="" width={100} height={100} /></Link>
        </div>
    );
};

export default NavBar;
