import React, { useState, useEffect } from "react";
import navBackground from '../../assets/navbarBackground.svg';
import dashboardBackground from '../../assets/dashboardMainImage.png';
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutClub } from "../../api/club";
import { clubLogout } from "../../store/slices/authSlice";

interface ImageData {
    dashboard?: boolean;
    color?: boolean,
    fixed?: boolean;
}

interface RootState {
    auth: {
        cLoggedIn: {
            name: string;
            image: string;
        };
    };
}

const NavBarFull: React.FC<ImageData> = ({ dashboard, color, fixed }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [clubName, setClubName] = useState('');
    const [clubImage, setClubImage] = useState('');

    const { cLoggedIn } = useSelector((state: RootState) => state.auth);
    // console.log(cLoggedIn);
    useEffect(() => {
        setClubName(cLoggedIn.name);
        setClubImage(cLoggedIn.image);
    }, [cLoggedIn]);

    const logoutHandler = async () => {
        const response = await logoutClub();
        if (response) {
            toast.success(response.data.message);
            dispatch(clubLogout());
            navigate('/club/login');
        }

    };

    // const ClubLogo = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1698230568/userManagement/fcmjysl2mhlauqcopgtj.png';
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
                    <img className="w-14 h-14 mr-3" src={clubImage}  alt="" />
                    <h1 className="text-white  text-2xl font-semibold">{clubName}</h1>
                </div>
                <div className="hidden md:block">
                    <button onClick={logoutHandler} className="p-2 bg-opacity-40 hover:bg-red-600  text-white bg-gray-400 rounded">LOG OUT</button>
                </div>
            </div >
        </>
    );
};

export default NavBarFull;
