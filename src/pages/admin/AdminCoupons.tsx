import { useQuery } from "@tanstack/react-query";
import NavBar from "../../components/admin/NavBar";
import CouponAdd from "../../components/admin/coupon/CouponAdd";
import CouponTable from "../../components/admin/coupon/CouponTable";
import { getCoupons } from "../../api/admin";

const AdminCoupons = () => {
    const { isLoading, data: couponData, refetch } = useQuery({ queryKey: ['coupons'], queryFn: getCoupons });
    return (
        <div className=" w-screen bg-gradient-to-r from-rose-50 to-teal-50">
            <NavBar />
            <div className="px-4 lg:px-14 pt-14">
                <CouponAdd refetchFn={refetch} />
                <CouponTable isLoading={isLoading} couponData={couponData?.data.reverse()} refetchFn={refetch} />
            </div>
        </div>
    );
};

export default AdminCoupons;
