import React, { useState } from "react";

const ProfileMenu = () => {
    const [selectedOption, setSelectedOption] = useState("MY CLUB");
    const [showOptions, setShowOptions] = useState(false);

    const options = [
        { label: "MY CLUB", value: "MY CLUB" },
        { label: "EDIT", value: "EDIT" },
        { label: "BACKGROUND", value: "BACKGROUND" },
        { label: "WALLET", value: "WALLET" },
    ];
    return (
        <div>
            <div className="bg-white shadow rounded w-44 text-center h-fit hidden lg:block">
                <div className="pt-2 px-5">
                    <div className="py-3 border-b hover:bg-gray-100 transition-all duration-100  cursor-pointer">
                        <h1 className="text-lg">
                            Tickets
                        </h1>
                    </div>
                    <div className="py-3 border-b hover:bg-gray-100 transition-all duration-100  cursor-pointer">
                        <h1 className="text-lg">
                            Bookings
                        </h1>
                    </div>
                    <div className="py-3 border-b hover:bg-gray-100 transition-all duration-100  cursor-pointer">
                        <h1 className="text-lg">
                            Edit Profile
                        </h1>
                    </div>
                    <div className="py-3 hover:bg-gray-100 transition-all duration-100  cursor-pointer">
                        <h1 className="text-lg">
                            Following
                        </h1>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow flex rounded justify-center gap-7 relative w-full lg:hidden">
                <div className="relative w-full">
                    <div
                        className="cursor-pointer rounded p-2 bg-white shadow focus:outline-none text-center"
                        onClick={() => setShowOptions(!showOptions)}
                    >
                        {selectedOption}
                    </div>
                    {showOptions && (
                        <div className="absolute bg-white mt-2 py-1 w-full border border-gray-300 rounded shadow-lg text-center">
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedOption(option.value);
                                        setShowOptions(false);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ProfileMenu;
