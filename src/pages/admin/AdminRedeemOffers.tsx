import NavBar from "../../components/admin/NavBar";
import RedeemOffers from "../../components/admin/redeemOffers/RedeemOffers";

const AdminRedeemOffers = () => {
    return (
        <div className="w-screen bg-gradient-to-r from-rose-50 to-teal-50 ">
            <NavBar />
            <div className="p-4 md:p-14 md:pr-16 min-h-screen">
                <RedeemOffers />
            </div>
        </div>
    );
};

export default AdminRedeemOffers;
