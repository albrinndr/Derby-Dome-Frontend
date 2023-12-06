import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutClub } from "../../../api/club";
import { clubLogout } from "../../../store/slices/authSlice";


interface RootState {
    auth: {
        cLoggedIn: {
            name: string;
            image: string;
            bgImg: string;
        };
    };
}

const ProfileBannerHead = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [clubName, setClubName] = useState('');
    const [clubImage, setClubImage] = useState('');
    const [clubBgImg, setClubBanner] = useState('');
    // const ClubBG = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1699006744/club-banners/vdwaui8m3bom4cmgohdy.webp';

    const { cLoggedIn } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        setClubName(cLoggedIn.name);
        setClubImage(cLoggedIn.image);
        setClubBanner(cLoggedIn.bgImg);
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
    const dashBoardStyle = 'pb-9';
    const divStyle = {
        backgroundImage: `url(${clubBgImg})`,
        height: '50vh',
        backgroundSize: 'cover',
    };
    return (
        <>
            <div style={divStyle} className={`pt-20 px-4 md:px-14 flex justify-between  ${dashBoardStyle}`}>
                <div className="flex items-center py-10" >
                    <img className="md:w-24 w-14 h-auto mr-3" src={clubImage} alt="" />
                    <h1 className="text-white text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-semibold  whitespace-normal max-w-screen-sm" style={{ textShadow: '1px 1px 1px #000000' }}>{clubName}</h1>
                </div>
                <div className="hidden md:block">
                    <button onClick={logoutHandler} className="p-2 bg-opacity-40 hover:bg-red-600  text-white bg-gray-400 rounded">LOG OUT</button>
                </div>
            </div>
        </>
    );
};

export default ProfileBannerHead;
