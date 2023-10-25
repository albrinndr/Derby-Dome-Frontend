import React from "react";

const ProfileClubEdit = () => {
    const ClubLogo = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1698230568/userManagement/fcmjysl2mhlauqcopgtj.png';

    return (
        <div className="px-4 md:px-14 mt-20">
            <form action="" className=" p-6 text-center ">
                <div className="flex justify-center gap-20">
                    <div className="hidden sm:block">
                        <img src={ClubLogo} alt="" width={150} height={150} />
                        <div className="mt-10 relative flex items-center justify-center">
                            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg">
                                Change Logo
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="">
                        <input
                            className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="text"
                            placeholder="Your name"
                        />
                        <br />
                        <input
                            className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="email"
                            name=""
                            id=""
                            placeholder="Your email"
                        />
                        <br />
                        <input
                            className="border  w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="password"
                            placeholder="Enter your current password"
                        />
                        <br />
                        <input
                            className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="password"
                            placeholder="Confirm password"
                        />
                        <br />
                        <div className=" sm:hidden flex items-center">
                            <img src={ClubLogo} alt="" width={100} height={100} />
                            <div className="mt-10 relative flex items-center justify-center">
                                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600  font-semibold py-2 px-4 rounded-lg">
                                    Change
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <button className="mt-4 w-48 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
                            SAVE
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default ProfileClubEdit;
