import { useState } from 'react';
import Logo from '../../../assets/logo-white.svg';
import LogoBlack from '../../../assets/logo.svg';
import MenuIcon from '../../../assets/menu.svg';
import MenuWhite from '../../../assets/menu-white.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutClub } from "../../../api/club";
import { clubLogout } from "../../../store/slices/authSlice";
import { useDispatch } from "react-redux";

interface NavBarProps {
    color?: boolean;
    fixed?: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ color, fixed }) => {
    const [dropMenu, setDropMenu] = useState(false);

    const handleMenu = () => {
        setDropMenu(prevMenu => !prevMenu);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const response = await logoutClub();
        if (response) {
            toast.success(response.data.message);
            dispatch(clubLogout());
            navigate('/club/login');
        }

    };

    const navBarStyle = color ? 'bg-white shadow  transition-all transition-all duration-1000 delay-2000 ' : 'bg-gray-900 bg-opacity-20';
    const itemStyle = color ? 'text-gray-800 ' : 'text-white';
    const navPosition = !fixed ? 'fixed' : 'sticky';
    const MenuIconType = color ? MenuIcon : MenuWhite;
    const MainLogo = color ?  LogoBlack: Logo;
    const underLineStyle = color ? 'group-hover:bg-gray-800' : 'group-hover:bg-white';
    return (
        <>
            <div className={` right-0 left-0 top-0 z-50 px-4 md:pl-14  ${navBarStyle} ${navPosition}`}>
                <div className="">
                    <div className="flex items-center justify-between py-4">
                        <div>

                            <img src={MainLogo} alt="" width="100rem" />
                        </div>

                        <div className="hidden md:flex md:items-center">
                            <a href="#" className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                                Dashboard
                                <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                            </a>
                            <a href="#" className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                                Fixtures
                                <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                            </a>
                            <Link to='/club/profile' className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                                My Club
                                <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                            </Link>
                        </div>


                        <div className="md:hidden cursor-pointer" onClick={handleMenu}>
                            <img src={MenuIconType} alt="" width="30rem" />
                        </div>
                    </div>

                    {dropMenu && <div className="block md:hidden bg-white rounded py-2">
                        <div className="flex flex-col p-3">
                            <Link to="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-2">Dashboard</Link>
                            <Link to="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-2">Fixtures</Link>
                            <Link to="/club/profile" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-2">My Club</Link>
                            <div className="flex justify-between items-center border-t-2 pt-2">
                                <button onClick={logoutHandler} className="text-gray-800 text-md font-semibold border px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white">Log Out</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default NavBar;
