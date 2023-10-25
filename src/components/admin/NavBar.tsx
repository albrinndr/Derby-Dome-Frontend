import React from "react";
import Logo from '../../assets/logo.svg';

const NavBar = () => {
    return (
        <div className="bg-white shadow pl-3 py-4">
            <img src={Logo} alt="" width={100} height={100}/>
        </div>
    );
};

export default NavBar;
