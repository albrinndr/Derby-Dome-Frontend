import React from "react";
import Logo from '../../assets/logo.svg';

const NavBar = () => {
    return (
        <div className="bg-white shadow sticky top-0 pl-3 py-4 z-10">
            <img src={Logo} alt="" width={100} height={100}/>
        </div>
    );
};

export default NavBar;
