import { useState } from 'react';
import Logo from '../../assets/logo.svg';
import MenuIcon from '../../assets/menu.svg';
import MenuWhite from '../../assets/menu-white.svg';

interface NavBarProps {
    color?: boolean;
    fixed?: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ color, fixed }) => {
    const [dropMenu, setDropMenu] = useState(false);

    const handleMenu = () => {
        setDropMenu(prevMenu => !prevMenu);
    };
    const navBarStyle = !color ? 'bg-white shadow  transition-all transition-all duration-1000 delay-2000 ' : '';
    const itemStyle = !color ? 'text-gray-800 ' : 'text-white';
    const navPosition = fixed ? 'fixed' : 'sticky';
    const MenuIconType = !color ? MenuIcon : MenuWhite;
    const underLineStyle = !color ? 'group-hover:bg-gray-800' : 'group-hover:bg-white';
    return (
        <div className={` right-0 left-0 top-0 z-50 px-4 md:px-14 ${navBarStyle} ${navPosition}`}>
            <div className="">
                <div className="flex items-center justify-between py-4">
                    <div>

                        <img src={Logo} alt="" width="100rem" />
                    </div>

                    <div className="hidden md:flex md:items-center">
                        <a href="#" className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Home
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </a>
                        <a href="#" className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Fixtures
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </a>
                        <a href="#" className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Reviews
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </a>
                        <a href="#" className={`${itemStyle} text-md font-semibold relative mr-9 group`}>
                            Community
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </a>
                        <a href="#" className={`${itemStyle} text-md font-semibold relative group`}>
                            Search
                            <span className={`absolute left-0 right-0 bottom-0 h-px top-7 ${underLineStyle} transition-all`}></span>
                        </a>
                    </div>


                    <div className="hidden md:flex md:items-center">
                        <a href="#" className={`${itemStyle} text-md font-semibold  px-4 py-2 rounded-lg  hover:bg-gray-400 hover:bg-opacity-25`}>Log In</a>
                    </div>

                    <div className="md:hidden cursor-pointer" onClick={handleMenu}>
                        <img src={MenuIconType} alt="" width="30rem" />
                    </div>
                </div>

                {dropMenu && <div className="block md:hidden bg-white  border-t-2 py-2">
                    <div className="flex flex-col p-3">
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Home</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Fixtures</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Reviews</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Community</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Search</a>
                        <div className="flex justify-between items-center border-t-2 pt-2">
                            <a href="#" className="text-gray-800 text-md font-semibold border px-4 py-1 rounded-lg hover:bg-gray-400 hover:bg-opacity-25">Log In</a>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default NavBar;
