import { useState } from 'react';
import Logo from '../../assets/logo.svg';
import MenuIcon from '../../assets/menu.svg';

interface NavBarProps {
    color?: boolean;
    fixed?: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ color,fixed }) => {
    const [dropMenu, setDropMenu] = useState(false);

    const handleMenu = () => {
        setDropMenu(prevMenu => !prevMenu);
    };
    const navBarStyle = !color ? 'bg-white shadow  transition-all transition-all duration-1000 delay-2000 ' : '';
    const itemStyle = !color ? 'text-gray-800 ' : 'text-white';
    const navPosition = fixed?'fixed':'sticky'
    return (
        <div className={` right-0 left-0 top-0 z-50 px-4 md:px-14 ${navBarStyle} ${navPosition}`}>
            <div className="">
                <div className="flex items-center justify-between py-4">
                    <div>

                        <img src={Logo} alt="" width="100rem" />
                    </div>

                    <div className="hidden md:flex md:items-center">
                    {/* style={{ textShadow: '2px 2px 4px #000000' }} */}
                        <a href="#" className={`${itemStyle} text-md  font-semibold hover:text-purple-600 mr-9`} >Home</a>
                        <a href="#" className={`${itemStyle} text-md font-semibold hover:text-purple-600 mr-9`} >Fixtures</a>
                        <a href="#" className={`${itemStyle} text-md font-semibold hover:text-purple-600 mr-9`} >Reviews</a>
                        <a href="#" className={`${itemStyle} text-md font-semibold hover:text-purple-600 mr-9`} >Community</a>
                        <a href="#" className={`${itemStyle} text-md font-semibold hover:text-purple-600 1`} >Search</a>
                    </div>

                    <div className="hidden md:flex md:items-center">
                        <a href="#" className={`${itemStyle} text-md font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-6001`}>Log In</a>
                    </div>

                    <div className="md:hidden cursor-pointer" onClick={handleMenu}>
                        <img src={MenuIcon} alt="" width="30rem" />
                    </div>
                </div>

                {dropMenu && <div className="block md:hidden bg-white opacity-90 border-t-2 py-2">
                    <div className="flex flex-col p-3">
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Home</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Fixtures</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Reviews</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Community</a>
                        <a href="#" className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-1">Search</a>
                        <div className="flex justify-between items-center border-t-2 pt-2">
                            <a href="#" className="text-gray-800 text-md font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600">Log In</a>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default NavBar;
