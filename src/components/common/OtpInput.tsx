import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import backgroundImage from '../../assets/stadium-background.webp';
// import { AiFillSwitcher } from 'react-icons/ai';
import { otpVerify } from '../../api/user';
import { useNavigate } from 'react-router-dom';


interface UserType {
  userType: string;
}
const OTPPage: React.FC<UserType> = ({ userType }) => {
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
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    height: '100vh',
    backgroundSize: 'cover',
  };

  const navigate = useNavigate();

  const submitHandler = async (otpValue: number) => {
    if (userType === 'user') {
      const response = await otpVerify(otpValue);
      console.log(response?.data.message);
      navigate('/login')
    }
  };
  return (
    <div style={divStyle} className="flex flex-col px-4 items-center justify-center min-h-screen bg-gray-200">
      <div className="relative w-full max-w-md">

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Enter OTP</h1>
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
            type="button"
            className={`mt-6 w-full rounded-3xl px-6 py-2 text-xl font-medium uppercase ${isFilled ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 pointer-events-none'
              }`}
            onClick={() => {
              if (isFilled) {
                const otpValue = otp.join('');
                submitHandler(parseInt(otpValue));
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
