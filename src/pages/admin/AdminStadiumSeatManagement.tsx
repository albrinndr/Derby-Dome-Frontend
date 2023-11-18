import StadiumManagement from "../../components/admin/stadium/StadiumManagement";
import NavBarStadium from "../../components/admin/nav/NavBarStadium";

const AdminStadiumSeatManagement = () => {
    return (
        <div className=" w-screen bg-gradient-to-r from-rose-50 to-teal-50">
            <NavBarStadium />
            <StadiumManagement />
        </div>

    );
};

export default AdminStadiumSeatManagement;
