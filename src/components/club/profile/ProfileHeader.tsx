import React from "react";

const ProfileHeader = () => {
    return (
        <div className="px-4 md:px-14">
            <div className=" bg-gray-400 bg-opacity-95 shadow-sm flex p-2 rounded justify-center gap-7">
                <h1 className="text-gray-800 font-semibold">MY CLUB</h1>
                <h1 className="text-gray-800 font-semibold">|</h1>
                <h1 className="text-gray-800 font-semibold">WALLET</h1>
            </div>

        </div>
    );
};

export default ProfileHeader;
