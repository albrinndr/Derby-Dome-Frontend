// import { useState } from "react";
import NavBar from "../../components/user/NavBar";
import BannerOne from "../../components/user/home/BannerOne";
import MatchDayCards from "../../components/user/home/MatchDayCards";
import { getBanner } from "../../api/user";
import { useQuery } from "@tanstack/react-query";

const UserHome = () => {
  // const [isScrolled, setIsScrolled] = useState(false);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  const { isLoading, data: banners } = useQuery({ queryKey: ['banners'], queryFn: getBanner });

  return (
    <div style={{ minHeight: '200vh' }}>
      {/* <NavBar color={!isScrolled} fixed /> */}
      <NavBar />
      <div className="relative z-0 ">
        {!isLoading && <BannerOne data={banners?.data[0]} />}
      </div>
      <div className="relative bottom-10">
        <MatchDayCards />
      </div>
    </div>
  );
};

export default UserHome;


