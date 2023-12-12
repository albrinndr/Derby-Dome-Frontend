import React, { useState } from "react";

interface Menu {
    changeFn: (val: string) => void;
}
const ProfileMenu: React.FC<Menu> = ({ changeFn }) => {
    const [selectedOption, setSelectedOption] = useState("Tickets");
    const [showOptions, setShowOptions] = useState(false);


    const optionHandler = (val: string) => {
        changeFn(val);
    };

    const options = [
        { label: "TICKETS", value: "tickets" },
        { label: "EDIT PROFILE", value: "edit" },
        { label: "BOOKINGS", value: "bookings" },
        { label: "FOLLOWINGS", value: "following" },
        { label: "REDEEM", value: "redeem" },
    ];
    return (
        <div>
            <div className="bg-white shadow rounded w-44 text-center h-fit hidden lg:block">
                <div className="pt-2 px-5">
                    <div className="py-3 border-b hover:bg-gray-100 transition-all duration-100  cursor-pointer" onClick={() => optionHandler('tickets')}>
                        <h1 className="text-lg">
                            Tickets
                        </h1>
                    </div>
                    <div className="py-3 border-b hover:bg-gray-100 transition-all duration-100  cursor-pointer" onClick={() => optionHandler('bookings')}>
                        <h1 className="text-lg">
                            Bookings
                        </h1>
                    </div>
                    <div className="py-3 border-b hover:bg-gray-100 transition-all duration-100  cursor-pointer" onClick={() => optionHandler('edit')}>
                        <h1 className="text-lg">
                            Edit Profile
                        </h1>
                    </div>
                    <div className="py-3 border-b hover:bg-gray-100 transition-all duration-100  cursor-pointer" onClick={() => optionHandler('following')}>
                        <h1 className="text-lg">
                            Following
                        </h1>
                    </div>
                    <div className="py-3 hover:bg-gray-100 transition-all duration-100  cursor-pointer" onClick={() => optionHandler('redeem')}>
                        <h1 className="text-lg">
                            Redeem
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
                        <p className="uppercase">{selectedOption}</p>
                    </div>
                    {showOptions && (
                        <div className="absolute bg-white mt-2 py-1 w-full border border-gray-300 rounded shadow-lg text-center z-50">
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedOption(option.value);
                                        optionHandler(option.value);
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
