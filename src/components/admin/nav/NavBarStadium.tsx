import React from "react";
import Logo from '../../../assets/logo.svg';

const NavBarStadium = () => {
    return (
        <div className="flex justify-between sticky top-0 bg-white shadow pl-3 py-4">
            <div className="">
                <img src={Logo} alt="" width={100} height={100} />
            </div>
            <div className="flex">
                <a href="#" className={`text-gray-800 text-sm sm:text-xl  font-semibold relative mr-3 sm:mr-9 group`}>
                    Banner
                    <span className={`absolute left-0 right-0 bottom-0 h-px top-7 group-hover:bg-gray-800 transition-all`}></span>
                </a>
                <a href="#" className={`text-gray-800  text-sm sm:text-xl font-semibold relative mr-3 sm:mr-9 group`}>
                    Seats
                    <span className={`absolute left-0 right-0 bottom-0 h-px top-7 group-hover:bg-gray-800 transition-all`}></span>
                </a>
                <a href="#" className={`text-gray-800 text-sm sm:text-xl font-semibold relative mr-3 sm:mr-9 group`}>
                    Timing
                    <span className={`absolute left-0 right-0 bottom-0 h-px top-7 group-hover:bg-gray-800 transition-all`}></span>
                </a>
            </div>
        </div>
    );
};

export default NavBarStadium;
