import { useMutation } from '@tanstack/react-query';
import React, { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { userForgotOtpVerify } from '../../../api/user';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import { clubForgotOtpVerify } from '../../../api/club';

interface UserType {
    userType?: string;
    changeFn: () => void;
}

const OtpVerifyForgot: React.FC<UserType> = ({ userType, changeFn }) => {

    const [otp, setOTP] = useState<string[]>(['', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 1) {
            const updatedOTP = [...otp];
            updatedOTP[index] = value;
            setOTP(updatedOTP);

            if (value.length === 1 && index < 3 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const isFilled = otp.every((value) => value !== '');

    const { status, mutate: userOtpValidateMutate } = useMutation({
        mutationFn: userForgotOtpVerify,
        onSuccess: ((res) => {
            if (res) {
                toast.success("Otp validated");
                changeFn();
            }
        })
    });

    const { status:clubStatus, mutate: clubOtpValidateMutate } = useMutation({
        mutationFn: clubForgotOtpVerify,
        onSuccess: ((res) => {
            if (res) {
                toast.success("Otp validated");
                changeFn();
            }
        })
    });

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.trim().length < 4) {
            toast.error("Enter valid otp");
            return;
        } else if (userType === "User") {
            userOtpValidateMutate(otpValue);
        }else{
            clubOtpValidateMutate(otpValue)
        }
    };

    return (
        <div className="flex flex-col px-4 items-center justify-center min-h-screen ">
            <div className="relative w-full rounded-lg shadow-lg bg-white max-w-md">
                <div className="px-20 py-10">
                    <h1 className="text-3xl font-semibold mb-4 text-center">Enter OTP</h1>
                    <form onSubmit={submitHandler}>
                        <div className="flex justify-center space-x-4">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl font-medium"
                                    value={value}
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className={`mt-6 w-full rounded-3xl px-6 py-2 text-xl font-medium uppercase ${isFilled ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 pointer-events-none'
                                }`}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {(status === "pending" || clubStatus==="pending") && <Loader />}
        </div>
    );
};

export default OtpVerifyForgot;
