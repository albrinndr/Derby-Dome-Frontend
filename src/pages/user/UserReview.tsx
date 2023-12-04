import { useState } from "react";
import NavBar from "../../components/user/NavBar";
import reviewBG from '../../assets/stadium-background1.webp';
import Reviews from "../../components/user/review/Reviews";
import FooterBlack from "../../components/common/FooterBlack";

const UserReview = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };


    const divStyle = {
        backgroundImage: `url(${reviewBG})`, // Use backgroundImage property
        backgroundSize: 'cover', // Optional: Adjust the size as needed
        backgroundRepeat: 'no-repeat', // Optional: Define the repeat behavior
    };

    return (
        <div>
            <div style={divStyle} className="min-h-screen">
                <NavBar color={!isScrolled} fixed />
                <div className="px-5 md:px-14 xl:px-28 pb-16 pt-40">
                    <Reviews />
                </div>
            </div>
            <FooterBlack />
        </div>
    );
};

export default UserReview;
