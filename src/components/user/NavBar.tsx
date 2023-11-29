import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/logo.svg';
import LogoWhite from '../../assets/logo-white.svg';
import MenuIcon from '../../assets/menu.svg';
import MenuWhite from '../../assets/menu-white.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { logout, notificationCount } from '../../api/user';
import toast from 'react-hot-toast';
import { userLogout } from '../../store/slices/authSlice';
import { CgProfile } from "react-icons/cg";
import Notification from './notification/Notification';


interface NavBarProps {
    color?: boolean;
    fixed?: boolean;
}

interface RootState {
    auth: {
        uLoggedIn: boolean;
    };
}

const NavBar: React.FC<NavBarProps> = ({ color, fixed }) => {
    const [dropMenu, setDropMenu] = useState(false);

    const { uLoggedIn } = useSelector((state: RootState) => state.auth);

    const handleMenu = () => {
        setDropMenu(prevMenu => !prevMenu);
    };
    const navBarStyle = !color ? 'bg-white shadow  transition-all transition-all duration-1000 delay-2000 ' : 'bg-gray-900 bg-opacity-30';
    const itemStyle = !color ? 'text-gray-800 ' : 'text-white';
    const navPosition = fixed ? 'fixed' : 'sticky';
    const MenuIconType = !color ? MenuIcon : MenuWhite;
    const underLineStyle = !color ? 'group-hover:bg-gray-800' : 'group-hover:bg-white';
    const MainLogo = color ? LogoWhite : Logo;

    //logout handler
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


    //notifications

    const [notificationSidebar, setNotificationSidebar] = useState(false);

    //notification count
    const [notiCount, setNotiCount] = useState(0);
    const { data: notiCountData,refetch } = useQuery(
        {
            queryKey: ['notificationCount'],
            queryFn: notificationCount,
            enabled: !!uLoggedIn,

        }
    );
    useEffect(() => {
        if (uLoggedIn && notiCountData && notiCountData.data) {
            setNotiCount(notiCountData.data);
        }
    }, [uLoggedIn, notiCountData]);



    return (
        <div className={` right-0 left-0 top-0 z-50 px-4 md:py-1 md:px-14 xl:px-28 ${navBarStyle} ${navPosition}`}>
            <div className="">
                <div className="flex items-center justify-between py-2">
                    <div>
                        <Link to='/'>
                            <img src={MainLogo} alt="" width="100rem" />
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center">
                        <Link to='/' className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Home
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </Link>
                        <Link to='/fixture' className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Fixtures
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </Link>
                        <Link to='/review' className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Reviews
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </Link>
                        {uLoggedIn && <Link to='/community' className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Community
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </Link>}
                        <Link to='/search' className={`${itemStyle} text-md font-semibold relative group`}>
                            Search
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </Link>
                    </div>

                    <div className='flex gap-2 sm:gap-5 items-center'>
                        {uLoggedIn && <div className="relative inline-block">
                            <button
                                onClick={() => setNotificationSidebar(!notificationSidebar)}
                                className="relative z-10 block p-2   border border-transparent rounded-md  hover:bg-gray-300 hover:bg-opacity-20  focus:outline-none"
                            >
                                <div className='relative'>
                                    <svg onClick={() => setNotiCount(0)}
                                        className={`w-7 h-7 ${itemStyle}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    {notiCount !== 0 && <div className='w-fit absolute top-0 right-0'>
                                        <div className="rounded-full bg-red-600 text-white h-5 w-5 flex p-1 justify-center items-center" style={{ borderRadius: '50%' }}>
                                            <span>{notiCount}</span>
                                        </div>
                                    </div>}
                                </div>
                            </button>
                        </div>}

                        <div className="hidden md:flex md:items-center">
                            {uLoggedIn ?
                                <Link to='/profile' className={`${itemStyle} text-2xl p-2 font-semibold relative group hover:bg-gray-300 hover:bg-opacity-20 rounded-lg`}>
                                    <p className=''><CgProfile /></p>
                                    {/* <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span> */}
                                </Link>
                                :
                                <Link to='/login' className={`${itemStyle} text-md font-semibold  px-4 py-2 rounded-0  hover:bg-gray-400 hover:bg-opacity-25 hover:shadow-inner`}>Log In</Link>
                            }

                        </div>

                        <div className="md:hidden cursor-pointer" onClick={handleMenu}>
                            <img src={MenuIconType} alt="" width="30rem" />
                        </div>
                    </div>
                </div>

                {dropMenu && <div className="block md:hidden bg-white  border-t-2 py-2">
                    <div className="flex flex-col p-3">
                        <Link to='/' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Home</Link>
                        <Link to='/fixture' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Fixtures</Link>
                        <Link to='/review' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Reviews</Link>
                        {uLoggedIn && <Link to='/community' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Community</Link>}
                        <Link to='/search' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Search</Link>
                        <div className="flex justify-between items-center border-t-2 pt-2">
                            {
                                uLoggedIn ?
                                    <Link to='/profile' className="text-gray-800 text-md font-semibold border px-4 py-1 rounded-lg hover:bg-gray-400 hover:bg-opacity-25">Profile</Link>
                                    :
                                    <Link to='/login' className="text-gray-800 text-md font-semibold border px-4 py-1 rounded-lg hover:bg-gray-400 hover:bg-opacity-25">Log In</Link>
                            }
                        </div>

                        {
                            uLoggedIn && <div className="flex justify-between items-center pt-4">
                                <button className="bg-red-600 py-1 px-4 rounded-lg bg-opacity-80 hover:bg-opacity-95 text-white" onClick={logoutHandler}>Logout</button>
                            </div>
                        }
                    </div>
                </div>}
            </div>
            {notificationSidebar && <Notification closeFn={() => setNotificationSidebar(!notificationSidebar)} color={color} open={notificationSidebar}
           refetchFn={refetch} />}
        </div>
    );
};

export default NavBar;
