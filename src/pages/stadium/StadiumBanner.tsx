import Banner from "../../components/admin/banner/Banner";
import NavBar from "../../components/admin/nav/NavBarStadium";

const StadiumBanner = () => {
    return (
        <div className=" text-xl text-gray-900 font-semibold bg-slate-50 w-screen">
            <NavBar />
            <Banner />
        </div>
    );
};

export default StadiumBanner;
