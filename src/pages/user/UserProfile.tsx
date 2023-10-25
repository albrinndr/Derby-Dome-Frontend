import React from "react";
import NavBar from "../../components/user/NavBar";
import ProfileHeadSection from "../../components/user/ProfileHeadSection";
import ProfileEditSection from "../../components/user/ProfileEditSection";

const UserProfile = () => {
    return (
        <div className="bg-stone-50 min-h-screen">
            <NavBar />
            <ProfileHeadSection />
            <ProfileEditSection />
        </div>

    );
};

export default UserProfile;
