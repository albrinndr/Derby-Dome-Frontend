import { useState } from "react";
import NavBar from "../../components/user/NavBar";
import BannerOne from "../../components/user/home/BannerOne";
import MatchDayCards from "../../components/user/home/MatchDayCards";
import { getHome } from "../../api/user";
import { useQuery } from "@tanstack/react-query";
import Illustration from "../../components/user/home/Illustration";
import HomePageClubs from "../../components/user/home/HomePageClubs";
import FAQSection from "../../components/user/home/FaqSection";
// import BannerTwo from "../../components/user/home/BannerTwo";


const UserHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const { isLoading, data: homeData } = useQuery({ queryKey: ['home'], queryFn: getHome });
  return (
    <div>
      <NavBar color={!isScrolled} fixed />
      {!isLoading &&
        <>
          <div className="relative z-0 ">
            <BannerOne banners={homeData?.data.banners} />
          </div>
          {homeData?.data.fixtures &&
            <div className="relative bottom-7">
              <MatchDayCards fixtures={homeData.data.fixtures} price={homeData.data.minPrice} />
            </div>
          }
          {/* <BannerTwo /> */}
          {
            homeData?.data.clubs.length > 0 && <HomePageClubs clubs={homeData?.data.clubs} />
          }
          <Illustration />
          <FAQSection />
        </>
      }
    </div>
  );
};

export default UserHome;


