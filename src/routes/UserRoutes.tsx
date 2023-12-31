import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserHome from "../pages/user/UserHome";
import LoginPage from "../pages/LoginPage";
import UserSignUp from "../pages/user/UserSignUp";
import UserFixture from "../pages/user/UserFixture";
import UserSearch from "../pages/user/UserSearch";
import UserFixtureDetails from "../pages/user/UserFixtureDetails";
import LazyUserSkeleton from "../components/LazySkeleton/LazyUserSkeleton";
import UserProtect from "../components/user/UserProtect";
import Community from "../pages/community/Community";
import UserBooking from "../pages/user/UserBooking";
import UserVipBooking from "../pages/user/UserVipBooking";
import UserCheckout from "../pages/user/UserCheckout";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import NotFound from "../pages/NotFound";
import UserReview from "../pages/user/UserReview";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Footer from "../components/common/Footer";
const UserProfile = lazy(() => import('../pages/user/UserProfile'));
const UserClubView = lazy(() => import('../pages/user/UserClubView'));


const UserRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage user='user' />} />
            <Route path="forgotPassword" element={<ForgotPasswordPage user='User' />} />
            <Route path="signup" element={<UserSignUp />} />

            <Route element={<Footer />}>
                <Route index={true} element={<UserHome />} />
                <Route path='fixture' element={<UserFixture />} />
                <Route path='search' element={<UserSearch />} />
                <Route path='fixtureDetails' element={<UserFixtureDetails />} />
                <Route path='clubDetails' element={
                    <Suspense fallback={<LazyUserSkeleton />}>
                        <UserClubView />
                    </Suspense>
                } />
            </Route>

            <Route path="/review" element={<UserReview />} />
            <Route path='' element={<UserProtect />}>
                <Route path='community' element={<Community />} />
                <Route element={<Footer />}>
                    <Route path="profile" element={
                        <Suspense fallback={<LazyUserSkeleton />}>
                            <UserProfile />
                        </Suspense>
                    } />
                    <Route path="booking" element={<UserBooking />} />
                    <Route path="bookingVip" element={<UserVipBooking />} />
                    <Route path="checkout" element={<UserCheckout />} />
                </Route>
            </Route>
            <Route path='paymentSuccess' element={<PaymentSuccess />} />
            <Route path='paymentFailed' element={<PaymentFailed />} />
            <Route path='/club/*' />
            <Route path='/admin/*' />
            <Route path='*' element={<NotFound />} />

        </Routes>
    );
};

export default UserRoutes;
