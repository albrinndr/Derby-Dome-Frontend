import React, { useState } from "react";
import NavBar from "../../components/user/NavBar";
import chatBG from '../../assets/stadium-background1.webp';
import ChatBox from "../../components/chat/ChatBox";
import FooterBlack from "../../components/common/FooterBlack";

const Community = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    const divStyle = {
        backgroundImage: `url(${chatBG})`, // Use backgroundImage property
        backgroundSize: 'cover', // Optional: Adjust the size as needed
        backgroundRepeat: 'no-repeat', // Optional: Define the repeat behavior
    };

    return (
        <div>
            <div style={divStyle} className="min-h-screen">
                <NavBar color={!isScrolled} fixed />
                <div className="px-5 md:px-14 xl:px-28 pt-24 pb-10">
                    <ChatBox />
                </div>
            </div>
            <FooterBlack />
        </div>
    );
};

export default Community;
