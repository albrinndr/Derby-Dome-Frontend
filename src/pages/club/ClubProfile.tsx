// import { useState } from "react";
// import Navbar from "../../components/club/NavBarFull";
import ProfileClubEdit from "../../components/club/ProfileClubEdit";
import ProfileHeader from "../../components/club/ProfileHeader";

const ClubProfile = () => {
    // const [isScrolled, setIsScrolled] = useState(false);

    // window.onscroll = () => {
    //     setIsScrolled(window.pageYOffset === 0 ? false : true);
    //     return () => (window.onscroll = null);
    // };
    return (
        <div>
            {/* <Navbar color={!isScrolled} fixed/> */}
            <div className="relative z-10" style={{ marginTop: "-10px" }} >
                <ProfileHeader />
            </div>
            <ProfileClubEdit />

        </div>
    );
};

export default ClubProfile;
