import React,{useState} from "react";

const ProfileHeader = () => {
    const [state, setState] = useState('MY CLUB');

    return (
        <>
            <div className="px-4 md:px-14 hidden sm:block">
                <div className=" bg-gray-400 bg-opacity-95 shadow-sm flex p-2 rounded justify-center gap-7">
                    <h1 className="text-gray-800 font-semibold">MY CLUB</h1>
                    <h1 className="text-gray-800 font-semibold">|</h1>
                    <h1 className="text-gray-800 font-semibold">POSTER</h1>
                    <h1 className="text-gray-800 font-semibold">|</h1>
                    <h1 className="text-gray-800 font-semibold">WALLET</h1>
                </div>
            </div>
            <div className="px-4 md:px-14 sm:hidden">
                <div className=" bg-gray-400 bg-opacity-95 shadow-sm flex rounded justify-center gap-7">
                    <select name="" id="" defaultValue={state} className="w-full rounded p-2 bg-gray-400 bg-opacity-95 shadow-sm focus:outline-none text-center">
                        <option value="" onClick={()=>setState('MY CLUB')}>MY CLUB</option>
                        <option value="" onClick={()=>setState('POSTER')}>POSTER</option>
                        <option value="" onClick={()=>setState('WALLET')}>WALLET</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
