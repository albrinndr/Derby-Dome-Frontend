import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileHeader = () => {
    const [state, setState] = useState('MY CLUB');

    const navigate = useNavigate();
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setState(selectedValue); // You might need to update the state here as well if needed
        switch (selectedValue) {
            case 'MY CLUB':
                navigate('/club/profile');
                break;
            case 'EDIT':
                navigate('/club/profile/edit');
                break;
            case 'BACKGROUND':
                navigate('/club/profile/background');
                break;
            case 'WALLET':
                navigate('/club/profile/wallet');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="px-4 md:px-14 hidden sm:block">
                <div className=" bg-white  py-4 shadow-md flex p-2 rounded justify-center gap-7">
                    <Link to="/club/profile" className="text-gray-800 font-semibold">MY CLUB</Link>
                    <h1 className="text-gray-800 font-semibold">|</h1>
                    <Link to="/club/profile/edit" className="text-gray-800 font-semibold">EDIT</Link>
                    <h1 className="text-gray-800 font-semibold">|</h1>
                    <Link to="/club/profile/background" className="text-gray-800 font-semibold">BACKGROUND</Link>
                    <h1 className="text-gray-800 font-semibold">|</h1>
                    <Link to="#" className="text-gray-800 font-semibold">WALLET</Link>
                </div>
            </div>
            <div className="px-4 md:px-14 sm:hidden">
                <div className=" bg-white shadow-md flex rounded justify-center gap-7">
                    <select
                        name=""
                        id=""
                        value={state}
                        onChange={handleSelectChange}
                        className="w-full rounded p-2 bg-white bg-opacity-95 shadow-md focus:outline-none text-center"
                    >
                        <option value="MY CLUB">MY CLUB</option>
                        <option value="EDIT">EDIT</option>
                        <option value="BACKGROUND">BACKGROUND</option>
                        <option value="WALLET">WALLET</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
