import Banner from "../../components/admin/banner/Banner";
import NavBar from "../../components/admin/nav/NavBarStadium";

const StadiumBanner = () => {
    return (
        <div className="  bg-gradient-to-r from-rose-50 to-teal-50 w-screen">
            <NavBar />
            <Banner />
        </div>
    );
};

export default StadiumBanner;
