import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FixtureMenu = () => {
    const [state, setState] = useState('FIXTURES');

    const navigate = useNavigate();
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setState(selectedValue); // You might need to update the state here as well if needed
        switch (selectedValue) {
            case 'FIXTURES':
                navigate('/club/fixture');
                break;
            case 'NEW FIXTURE':
                navigate('/club/fixture/newFixture');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="px-4 md:px-14 hidden sm:block">
                <div className=" bg-white  py-4 shadow-md flex p-2 rounded justify-center gap-7">
                    <Link to="/club/fixture" className="text-gray-800 font-semibold">FIXTURES</Link>
                    <h1 className="text-gray-800 font-semibold">|</h1>
                    <Link to="/club/fixture/newFixture" className="text-gray-800 font-semibold">NEW FIXTURE</Link>
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
                        <option value="FIXTURES">FIXTURES</option>
                        <option value="NEW FIXTURE">NEW FIXTURE</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default FixtureMenu;
