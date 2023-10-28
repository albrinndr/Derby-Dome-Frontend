import React, { ChangeEvent, useState } from "react";

interface UserDetails {
    name?: string;
    email?: string;
    phone?: string;
}

interface ProfileEditProps {
    userDetails: UserDetails;
}

const ProfileEditSection: React.FC<ProfileEditProps> = ({ userDetails }) => {

    const [formData, setFormData] = useState({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        password: '',
        newPassword: '',
    });
    const { name, email, password, newPassword, phone } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    return (
        <div className="px-4 md:px-14 mt-20">
            <form action="" className=" p-6  text-center ">
                <div className="">
                    <input
                        className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                        type="text"
                        placeholder="Your name"
                        id="name"
                        value={name}
                        onChange={inputHandler}
                    />
                    <input
                        className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        readOnly
                    />
                </div>
                <div>
                    <input
                        className="border pr-3 w-full sm:w-64 lg:w-96  sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                        type="password"
                        placeholder="Enter your current password"
                        id="password"
                        value={password}
                        onChange={inputHandler}
                    />
                    <input
                        className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                        type="password"
                        id="newPassword"
                        placeholder="Confirm password"
                        value={newPassword}
                        onChange={inputHandler}
                    />
                </div>
                <div>
                    <input
                        className="border pr-3 w-full sm:w-64 lg:w-96  sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                        type="text"
                        placeholder="Enter your phone"
                        id="phone"
                        value={phone}
                        onChange={inputHandler}
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
