import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminProtect from "../components/admin/AdminProtect";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminClubs from "../pages/admin/AdminClubs";
import StadiumTiming from "../pages/stadium/StadiumTiming";
import StadiumBanner from "../pages/stadium/StadiumBanner";
import AdminStadiumSeatManagement from "../pages/admin/AdminStadiumSeatManagement";
import NotFound from "../pages/NotFound";
import AdminCoupons from "../pages/admin/AdminCoupons";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='login' element={<AdminLogin />} />
            <Route element={<AdminProtect />}>
                <Route path='' element={<AdminUsers />} />
                <Route path='users' element={<AdminUsers />} />
                <Route path='clubs' element={<AdminClubs />} />
                <Route path='stadium' element={<StadiumTiming />} />
                <Route path='stadium/timings' element={<StadiumTiming />} />
                <Route path='stadium/banner' element={<StadiumBanner />} />
                <Route path='stadium/seats' element={<AdminStadiumSeatManagement />} />
                <Route path='coupon' element={<AdminCoupons />} />
            </Route>
            <Route path='*' element={<NotFound />} />

        </Routes>
    );
};

export default AdminRoutes;
