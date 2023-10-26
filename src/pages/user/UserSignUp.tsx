import { useState } from "react";
import OtpInput from "../../components/common/OtpInput";
import NavBar from "../../components/user/NavBar";
import SignUp from "../../components/user/SignUp";

const UserSignUp = () => {
    const [showOtp, setShowOtp] = useState(false);

    const otpHandler = () => {
        setShowOtp(true);
    };
    return (
        <>
            <NavBar color={true} fixed />
            {showOtp ? <OtpInput /> : <SignUp otpSubmit={otpHandler} />}

        </>
    );
};

export default UserSignUp;
