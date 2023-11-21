import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getUserProfile } from "../../api/user";
import NavBar from "../../components/user/NavBar";
import ProfileHead from "../../components/user/profile/ProfileHead";
import ProfileMenu from "../../components/user/profile/ProfileMenu";
import ProfileEditSection from "../../components/user/profile/edit/ProfileEditSection";
import Tickets from "../../components/user/tickets/Tickets";
import ProfileSkeleton from "../../components/user/profile/ProfileSkeleton";

const UserProfile = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [com, setCom] = useState('tickets');

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const comHandler = (val: string) => {
        setCom(val);
    };

    const { data: userData, isLoading, refetch } = useQuery({ queryKey: ['userData'], queryFn: getUserProfile });
    const userDetails = {
        name: userData?.data.name,
        email: userData?.data.email,
        phone: userData?.data.phone,
        isGoogle: userData?.data.isGoogle,
        profilePic: userData?.data.profilePic,
        wallet: userData?.data.wallet
    };

    return (
        <div className="min-h-screen">
            <NavBar color={!isScrolled} fixed />
            {!isLoading ? <div>
                <div>
                    <ProfileHead userDetails={userDetails} />
                </div>
                <div className="bg-gray-50 pb-20 lg:pt-10 pt-7 px-5 md:px-14 xl:px-28 lg:flex gap-10">
                    <ProfileMenu changeFn={comHandler} />
                    <div className="mt-5 lg:mt-0 flex-1">
                        {com === 'edit' && <ProfileEditSection userDetails={userDetails} />}
                        {com === 'tickets' && <Tickets uRefetchFn={refetch} />}
                    </div>
                </div>
            </div> :
                <ProfileSkeleton />
            }
        </div>
    );
};

export default UserProfile;

