import React, { CSSProperties, FormEvent, useState } from "react";
import Img from '../../../assets/form-image.webp';
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userForgotPassword } from "../../../api/user";
import toast from "react-hot-toast";
import Loader from "../Loader";

interface EmailI {
    type: string;
    changeFn: () => void;
}

const EmailVerify: React.FC<EmailI> = ({ type, changeFn }) => {
    const [email, setEmail] = useState('');

    const { status, mutate: userForgotMutate } = useMutation({
        mutationFn: userForgotPassword,
        onSuccess: ((res) => {
            if (res) {
                toast.success("Otp have been sent to your email.");
                changeFn();
            }
        })
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.trim().length <= 1) {
            toast.error("Enter a valid email");
            return;
        } else if (type == "User") {
            userForgotMutate(email);
        }
    };

    const divStyleImg: CSSProperties = {
        backgroundImage: `url(${Img})`,
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };
    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow rounded-lg my-10">
                    <div
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        style={divStyleImg}
                    ></div>
                    <div className="w-full lg:w-1/2 bg-white  p-5 rounded-lg lg:rounded-l-none">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                            <p className="mb-4 text-sm text-gray-700">
                                We get it, stuff happens. Just enter your email address below and we'll send you a
                                link to reset your password!
                            </p>
                        </div>
                        <form className="px-8 pt-6 pb-8 mb-4  rounded" onSubmit={submitHandler}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    {type}  Email:
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Enter Email Address..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Reset Password
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link to={type == "User" ? '/signup' : '/club/signup'}
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"

                                >
                                    Create an Account!
                                </Link>
                            </div>
                            <div className="text-center">
                                <Link to={type == "User" ? '/login' : '/club/login'}
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Already have an account? Login!
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default EmailVerify;
