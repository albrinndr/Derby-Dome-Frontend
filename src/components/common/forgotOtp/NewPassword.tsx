import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { userForgotPasswordChange } from "../../../api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
interface NewPasswordI {
    type: string;
}

const NewPassword: React.FC<NewPasswordI> = ({ type }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const { status, mutate: userPasswordChangeMutate } = useMutation({
        mutationFn: userForgotPasswordChange,
        onSuccess: ((res) => {
            if (res) {
                toast.success("Password Changed");
                navigate('/login');
            }
        })
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.trim().length < 5) {
            toast.error("Enter valid password");
            return;
        } else if (password !== confirmPassword) {
            toast.error("Passwords doesn't match!");
            return;
        } else if (type === "User") {
            userPasswordChangeMutate(password);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow justify-center rounded-lg my-10">

                    <div className="w-full lg:w-1/2 bg-white  p-5 rounded-lg">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">Enter your new password</h3>
                        </div>
                        <form className="px-8 pt-6 pb-8 mb-4  rounded" onSubmit={submitHandler}>
                            <div className="mb-7">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Password:
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    type="password"
                                    placeholder="Enter Password..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <small>Min 5 characters</small>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Confirm Password:
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Re enter your password..."
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {status === "pending" && <Loader />}
        </div>
    );
};

export default NewPassword;
