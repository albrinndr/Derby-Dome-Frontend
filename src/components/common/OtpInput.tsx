import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect, FormEvent } from 'react';
import backgroundImage from '../../assets/stadium-background.webp';
// import { AiFillSwitcher } from 'react-icons/ai';
import { otpVerify, resendOtp } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


interface UserType {
  userType: string;
}
const OTPPage: React.FC<UserType> = ({ userType }) => {
  const [otp, setOTP] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState<number>(180); // 3 minutes in seconds
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    height: '100vh',
    backgroundSize: 'cover',
  };

  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join('');
    // if (isFilled) {
    //   submitHandler(parseInt(otpValue));
    // }

    if (userType === 'user') {
      console.log(otpValue);
      const response = await otpVerify(parseInt(otpValue));
      if (response) {
        toast.success(response?.data.message);
        navigate('/login');
      }
    }
  };
  const handleResendOTP = async () => {
    const response = await resendOtp();
    if (response) {
      toast.success(response?.data.message);
      setTimer(180); // Reset the timer to 3 minutes
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return (
    <div style={divStyle} className="flex flex-col px-4 items-center justify-center min-h-screen bg-gray-200">
      <div className="relative w-full max-w-md">

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Enter OTP</h1>
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
          <div className="text-center mt-4 font-semibold text-sm text-gray-600">
            {timer > 0 && (
              <div>
                {`OTP expires in ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
              </div>
            )}
            <div>
              {/* {timer === 0 && ( */}
              <button onClick={handleResendOTP} className="ml-2  text-blue-500 hover:underline focus:outline-none">
                Resend OTP
              </button>
              {/* )} */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
