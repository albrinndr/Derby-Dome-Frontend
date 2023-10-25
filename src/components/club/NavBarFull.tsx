import React from "react";
import navBackground from '../../assets/navbarBackground.svg';
import dashboardBackground from '../../assets/dashboardMainImage.png';
import NavBar from "./NavBar";

interface ImageData {
    dashboard?: boolean;
    color?: boolean,
    fixed?: boolean;
}
const NavBarFull: React.FC<ImageData> = ({ dashboard, color, fixed }) => {
    const ClubLogo = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1698230568/userManagement/fcmjysl2mhlauqcopgtj.png';
    const mainImage = dashboard ? dashboardBackground : navBackground;
    const dashBoardStyle = dashboard ? 'pb-28' : 'pb-9';
    const divStyle = {
        backgroundImage: `url(${mainImage})`,
        height: '100%',
    };
    return (
        <>
            <NavBar color={color} fixed={fixed} />
            <div style={divStyle} className={`pt-20 px-4 md:px-14 flex justify-between  ${dashBoardStyle}`}>
                <div className="flex items-center ">
                    <img className="w-10 sm:w-auto h-10 sm:h-auto" src={ClubLogo} alt="" />
                    <h1 className="text-white  text-2xl font-semibold">KERALA FC</h1>
                </div>
                <div className="hidden md:block">
                    <button className="p-2 bg-opacity-40 hover:bg-red-600  text-white bg-gray-400 rounded">LOG OUT</button>
                </div>
            </div >
        </>
    );
};

export default NavBarFull;
