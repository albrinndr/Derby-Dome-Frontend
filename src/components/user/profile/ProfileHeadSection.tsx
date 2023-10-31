import { useDispatch } from 'react-redux';
import { logout } from '../../../api/user';
import toast from 'react-hot-toast';
import { userLogout } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

interface UserData {
    userData?: string;
    isLoading?: boolean;
    profilePic?: string;
}

const ProfileHeadSection: React.FC<UserData> = ({ userData, isLoading, profilePic }) => {
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
    const userName = isLoading ? <span className="text-2xl text-gray-600">Loading...</span> : userData;

    return (
        <div className="px-4 md:px-14 pt-10 bg-sky-100 shadow ">
            <div className="flex justify-between">
                <div className=''>
                    <div className='sm:flex'>
                        <img className='rounded-full mr-2' width={60} height={60} src={profilePic} alt="" />
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-semibold subpixel-antialiased text-blue-950">HI, {userName}</h1>
                    </div>
                    <h3 className="mt-3 text-gray-600 sm:text-sm md:text-base lg:text-lg">WALLET: 4000 points left to spend</h3>
                </div>
                <div>
                    <button onClick={logoutHandler} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ">
                        Logout
                    </button>
                </div>
            </div>
            <div className="mt-6 ">
                <div className="flex justify-between sm:justify-center  ">
                    <p className="text-lg sm:mr-16 sm:font-semibold pb-2 text-gray-700">TICKETS</p>
                    <p className="text-lg sm:mr-16 pb-2 text-gray-700">|</p>
                    <p className="text-lg sm:mr-16 sm:font-semibold text-gray-700">BOOKINGS</p>
                    <p className="text-lg sm:mr-16 pb-2 text-gray-700">|</p>
                    <p className="text-lg sm:mr-16 sm:font-semibold text-gray-700">EDIT</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeadSection;
