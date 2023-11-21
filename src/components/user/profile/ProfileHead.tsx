import { useDispatch } from 'react-redux';
import profileBG from '../../../assets/profile/profileBG.webp';
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../../../api/user';
import toast from 'react-hot-toast';
import { userLogout } from '../../../store/slices/authSlice';


interface ProfileHead {
    userDetails: {
        name: string;
        email: string;
        wallet: number;
        profilePic: string;
    };
}

const ProfileHead: React.FC<ProfileHead> = ({ userDetails }) => {
    const divStyle = {
        backgroundImage: `url(${profileBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const logoutHandler = async () => {
        queryClient.invalidateQueries({ queryKey: ['userData'] });
        const response = await logout();
        if (response) {
            toast.success(response.data.message);
            dispatch(userLogout());
            navigate('/login');
        }

    };

    return (
        <div>
            <div style={divStyle} className="h-52 relative">
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="px-5 md:px-14 xl:px-28 mt-[-70px] z-10 relative shadow pb-5">
                <div className="">
                    <div className="flex flex-col sm:flex-row items-center">
                        <div className="border-4 sm:border-8 border-white rounded-full">
                            <img
                                src={userDetails.profilePic}
                                alt=""
                                className="rounded-full w-28 sm:w-36"
                            />
                        </div>
                        <div className="sm:flex sm:justify-between sm:w-full">
                            <div className="sm:mt-20 mt-4 flex flex-col justify-between items-center">
                                <h1 className="sm:text-6xl text-3xl font-semibold">Hi, {userDetails.name}</h1>
                                <div className="flex flex-col items-center sm:flex-row gap-2 sm:gap-10 pt-2 sm:pt-4">
                                    <p className="flex items-center gap-2 sm:text-lg"><MdOutlineEmail /> {userDetails.email}</p>
                                    <p className="sm:text-lg">Wallet : ₹{userDetails.wallet}</p>
                                </div>
                            </div>
                            <div className="hidden sm:block clear-left mt-28">
                                <button className="bg-red-600 py-2 px-4 rounded bg-opacity-80 hover:bg-opacity-95 text-white" onClick={logoutHandler}>Logout</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileHead;
