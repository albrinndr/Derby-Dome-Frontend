import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { getClubProfile, updateClubProfile } from "../../../api/club";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setClubLogin } from "../../../store/slices/authSlice";
import toast from "react-hot-toast";

const ProfileClubEdit = () => {
    const { data: clubData, isLoading } = useQuery({ queryKey: ['clubData'], queryFn: getClubProfile });
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        newPassword: '',
        contactPerson: '',
        address: '',
        description: ''
    });

    const [image, setImage] = useState<File | null>(null);
    useEffect(() => {
        if (!isLoading && clubData) {
            setFormData({
                name: clubData.data.name,
                email: clubData.data.email,
                phone: clubData.data.phone,
                password: '',
                newPassword: '',
                contactPerson: clubData.data.contactPerson,
                address: clubData.data.address,
                description: clubData.data.description,
            });
            const data = {
                name: clubData.data.name,
                image: clubData.data.image,
                description: clubData.data.description,
                address: clubData.data.address,
            };

            dispatch(setClubLogin(data));
        }
    }, [isLoading, clubData, dispatch]);


    const { name, email, phone, password, newPassword, contactPerson, address, description } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const queryClient = useQueryClient();

    const { status, mutate } = useMutation({
        mutationFn: updateClubProfile,
        onSuccess: (data) => {
            queryClient.setQueryData(['clubData'], data);
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
        } else if (phone.trim().length < 1 || !phone.match(/^[6-9]\d{9}$/)) {
            toast.error('Enter a valid phone number');
            return;
        }

        const clubData = new FormData();
        clubData.append("name", name);
        clubData.append("email", email);
        clubData.append("phone", phone);
        clubData.append("password", password);
        clubData.append("newPassword", newPassword);
        clubData.append("address", address);
        clubData.append("description", description);
        clubData.append("contactPerson", contactPerson);
        if (image) clubData.append("image", image);
        mutate(clubData);
        setImage(null);
    };

    const isDisabled = (status as string) === 'loading' || (status as string) === 'pending';

    return (
        <div className="px-4 md:px-14 mt-12">
            {!isLoading && <form onSubmit={submitHandler} className=" p-6 text-center ">
                <div className="flex justify-center gap-10 md:gap-20">
                    <div className="hidden sm:block">
                        <img src={clubData?.data.image} alt="" width={150} height={150} />
                        <div className="mt-10 relative flex items-center justify-center">
                            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg">
                                {image ? image.name : 'Change logo'}
                                <input
                                    className="hidden"
                                    type="file"
                                    name='file'
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="">
                        <div className="md:flex">
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
                                type="text"
                                name=""
                                id="contactPerson"
                                placeholder="Contact Person"
                                value={contactPerson}
                                onChange={inputHandler}

                            />
                        </div>
                        <div className="md:flex">
                            <input
                                className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                                type="email"
                                name=""
                                id="email"
                                placeholder="Your email"
                                value={email}
                                onChange={inputHandler}
                                readOnly
                            />
                            <input
                                className="border w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                                type="number"
                                name=""
                                id="phone"
                                placeholder="Your phone no."
                                value={phone}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="md:flex">
                            <textarea
                                className="border  w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green- h-20"
                                id="address"
                                value={address}
                                onChange={textAreaHandler}
                            ></textarea>
                            <textarea
                                className="border  w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 h-20"
                                id="description"
                                value={description}
                                onChange={textAreaHandler}
                            ></textarea>
                        </div>
                        <div className="md:flex">
                            <input
                                className="border  w-full sm:w-64 lg:w-96 pr-3 sm:mr-6 mb-6 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100"
                                type="password"
                                id="password"
                                placeholder="Enter your current password"
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
                        <br />
                        <div className=" sm:hidden flex items-center">
                            <img src={clubData?.data.image} alt="" width={100} height={100} />
                            <div className="mt-10 relative flex items-center justify-center">
                                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600  font-semibold py-2 px-4 rounded-lg">
                                    Change
                                    <input
                                        className="hidden"
                                        id="image"
                                        type="file"
                                        name='file'
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="mt-4 w-48 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-100" type="submit" disabled={isDisabled}>
                            SAVE
                        </button>
                    </div>
                </div>
            </form>}

        </div>
    );
};

export default ProfileClubEdit;
