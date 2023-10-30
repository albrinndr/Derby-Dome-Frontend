import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from "../../api/user";
import toast from "react-hot-toast";

interface UserDetails {
    name?: string;
    email?: string;
    phone?: string;
    isGoogle?: boolean;
}

interface ProfileEditProps {
    userDetails: UserDetails;
}

const ProfileEditSection: React.FC<ProfileEditProps> = ({ userDetails }) => {

    const [formData, setFormData] = useState({
        name: userDetails.name || '',
        email: userDetails.email || '',
        phone: userDetails.phone || '',
        password: '',
        newPassword: '',
    });

    useEffect(() => {
        setFormData({
            name: userDetails.name || '',
            email: userDetails.email || '',
            phone: userDetails.phone || '',
            password: '',
            newPassword: '',
        });
    }, [userDetails]);

    const { name, email, password, newPassword, phone } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const queryClient = useQueryClient();

    const { status, mutate } = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (data) => {
            queryClient.setQueryData(['userData'], data);
        },
    });

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim().length < 1 || !name.match(/^[a-zA-Z ]{2,30}$/)) {
            toast.error('Enter a valid name');
            return;
        } else if (password.trim().length > 0 && newPassword.trim().length == 0) {
            toast.error('Enter new password');
            return;
        } else if (userDetails.isGoogle === false && (phone.trim().length < 1 || !phone.match(/^[6-9]\d{9}$/))) {
            toast.error('Enter a valid phone number');
            return;
        }
        mutate(formData);
    };
    const isDisabled = (status as string) === 'loading' || (status as string) === 'pending';

    return (
        <div className="px-4 md:px-14 mt-20">
            <form className=" p-6  text-center " onSubmit={submitHandler}>
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
                        placeholder="Enter new password"
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
                    <button disabled={isDisabled} className="mt-4 w-48 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-100" type="submit">
                        SAVE
                    </button>
                </div>
            </form>

        </div>
    );
};

export default ProfileEditSection;
