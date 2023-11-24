import NavBar from "../../components/admin/NavBar";
import CouponAdd from "../../components/admin/coupon/CouponAdd";
import CouponTable from "../../components/admin/coupon/CouponTable";

const AdminCoupons = () => {
    return (
        <div className=" w-screen bg-gradient-to-r from-rose-50 to-teal-50">
            <NavBar />
            <div className="px-4 lg:px-14 pt-14">
                <CouponAdd />
                <CouponTable />
            </div>
        </div>
    );
};

export default AdminCoupons;
