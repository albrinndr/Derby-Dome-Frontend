import NavBar from "../../components/user/NavBar";
import ProfileHeadSection from "../../components/user/ProfileHeadSection";
import ProfileEditSection from "../../components/user/ProfileEditSection";
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from "../../api/user";

const UserProfile = () => {
    const { data: userData, isLoading } = useQuery({ queryKey: ['userData'], queryFn: getUserProfile });
    const userDetails = {
        name: userData?.data.name,
        email: userData?.data.email,
        phone:userData?.data.phone
    };
    return (
        <div className="bg-stone-50 min-h-screen">
            <NavBar />
            <ProfileHeadSection userData={userData?.data.name} isLoading={isLoading} />
            {!isLoading && <ProfileEditSection userDetails={userDetails} />}
        </div>

    );
};

export default UserProfile;
