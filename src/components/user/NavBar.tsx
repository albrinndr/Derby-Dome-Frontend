import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/logo.svg';
import LogoWhite from '../../assets/logo-white.svg';
import MenuIcon from '../../assets/menu.svg';
import MenuWhite from '../../assets/menu-white.svg';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../../api/user';
import toast from 'react-hot-toast';
import { userLogout } from '../../store/slices/authSlice';


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
    const navBarStyle = !color ? 'bg-white shadow  transition-all transition-all duration-1000 delay-2000 ' : 'bg-gray-900 bg-opacity-20';
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

    return (
        <div className={` right-0 left-0 top-0 z-50 px-4 md:py-2 md:px-14 xl:px-28 ${navBarStyle} ${navPosition}`}>
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
                        <Link to='#' className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
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


                    <div className="hidden md:flex md:items-center">
                        {uLoggedIn ?
                            <Link to='/profile' className={`${itemStyle} text-md font-semibold relative group`}>
                                Profile
                                <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                            </Link>
                            :
                            <Link to='/login' className={`${itemStyle} text-md font-semibold  px-4 py-2 rounded-0  hover:bg-gray-400 hover:bg-opacity-25 hover:shadow-inner`}>Log In</Link>
                        }

                    </div>

                    <div className="md:hidden cursor-pointer" onClick={handleMenu}>
                        <img src={MenuIconType} alt="" width="30rem" />
                    </div>
                </div>

                {dropMenu && <div className="block md:hidden bg-white  border-t-2 py-2">
                    <div className="flex flex-col p-3">
                        <Link to='/' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Home</Link>
                        <Link to='/fixture' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Fixtures</Link>
                        <Link to='#' className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Reviews</Link>
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
        </div>
    );
};

export default NavBar;
