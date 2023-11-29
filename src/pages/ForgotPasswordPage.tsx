import React from "react";
import ForgotPassword from "../components/common/forgotOtp/ForgotPassword";
import NavBar from "../components/user/NavBar";

interface User {
    user: string;
}

const ForgotPasswordPage: React.FC<User> = ({ user }) => {
    return (
        <div>
            <NavBar color={true} fixed />
            <ForgotPassword type={user} />
        </div>
    );
};

export default ForgotPasswordPage;
