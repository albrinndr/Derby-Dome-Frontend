import React, { CSSProperties, useState } from "react";
import backgroundImage from '../../../assets/stadium-background.webp';
import EmailVerify from "./EmailVerify";
import OtpVerifyForgot from "./OtpVerifyForgot";
import NewPassword from "./NewPassword";
interface User {
    type: string;
}

const ForgotPassword: React.FC<User> = ({ type }) => {

    const [emailPage, setEmailPage] = useState(true);
    const [otpPage, setOtpPage] = useState(false);
    const [newPasswordPage, setNewPasswordPage] = useState(false);

    const divStyleBg: CSSProperties = {
        backgroundImage: `url(${backgroundImage})`,
        height: '100%',
    };

    const changeToOtpPageHandler = () => {
        setEmailPage(false);
        setOtpPage(true);
    };

    const changeToPasswordHandler = () => {
        setOtpPage(false);
        setNewPasswordPage(true);
    };

    return (
        <div style={divStyleBg} className="min-h-screen flex items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">
            {emailPage && <EmailVerify type={type} changeFn={changeToOtpPageHandler} />}
            {otpPage && <OtpVerifyForgot userType={type} changeFn={changeToPasswordHandler} />}
            {newPasswordPage && <NewPassword type={type} />}
        </div>
    );
};

export default ForgotPassword;
