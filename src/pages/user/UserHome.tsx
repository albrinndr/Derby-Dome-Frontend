import { useState } from "react";
import NavBar from "../../components/user/NavBar";
import BannerOne from "../../components/user/BannerOne";
import MatchDayCards from "../../components/user/MatchDayCards";

const UserHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const imageURL = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1698151130/userManagement/zu797ljiskrvdxbb54p7.png';
  // const imageURL = 'https://wallpapers.com/images/hd/white-full-screen-with-stripes-k6sqdizwumrl3y8h.jpg';
  return (
    <div style={{ minHeight: '200vh' }}>
      <NavBar color={!isScrolled} fixed />
      <div className="relative z-0 ">
        <BannerOne banner={imageURL} />
      </div>
      <div className="relative bottom-10">
        <MatchDayCards />
      </div>
    </div>
  );
};

export default UserHome;


