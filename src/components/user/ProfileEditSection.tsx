import React from "react";

const ProfileEditSection = () => {
    return (
        <div className="px-4 md:px-14 mt-20">
            <form action="" className=" p-6  text-center ">
                    <div className="">
                        <input
                            className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="text"
                            placeholder="Your name"
                        />
                        <input
                            className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="email"
                            name=""
                            id=""
                            placeholder="Your email"
                        />
                    </div>
                    <div>
                        <input
                            className="border pr-3 w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="password"
                            placeholder="Enter your current password"
                        />
                        <input
                            className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                            type="password"
                            placeholder="Confirm password"
                        />
                    </div>

                <div className="">
                    <button className="mt-4 w-48 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-100">
                        SAVE
                    </button>
                </div>
            </form>

        </div>
    );
};

export default ProfileEditSection;
