import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserHome from './pages/user/UserHome';
import UserSignUp from './pages/user/UserSignUp';
import UserProfile from './pages/user/UserProfile';
import UserProtect from './components/user/UserProtect';

import AdminLogin from './pages/admin/AdminLogin';
import AdminUsers from './pages/admin/AdminUsers';
import AdminClubs from './pages/admin/AdminClubs';
import AdminProtect from './components/admin/AdminProtect';

import ClubSignUp from './pages/club/ClubSignUp';
import ClubProfile from './pages/club/ClubProfile';
import ClubProtect from './components/club/ClubProtect';
import ClubProfileEdit from './pages/club/ClubProfileEdit';
import ClubBackground from './pages/club/ClubBackground';
import ClubNewFixture from './pages/club/ClubNewFixture';

import StadiumBanner from './pages/stadium/StadiumBanner';
import StadiumTiming from './pages/stadium/StadiumTiming';
import StadiumSeats from './pages/stadium/StadiumSeats';

import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import ClubProfileHead from './components/club/headers/ClubProfileHead';
import ClubFixtures from './pages/club/ClubFixtures';
import ClubTeamManagement from './pages/club/ClubTeamManagement';
import PaymentSuccess from './pages/club/PaymentSuccess';
import PaymentFailed from './pages/club/PaymentFailed';
import UserFixture from './pages/user/UserFixture';
import UserSearch from './pages/user/UserSearch';
import UserFixtureDetails from './pages/user/UserFixtureDetails';
import UserClubView from './pages/user/UserClubView';
import Community from './pages/community/Community';

export default function App() {
  return (
    <>
      <Toaster position="top-right"
        reverseOrder={false} />
      <Routes>
        <Route path="/">
          <Route index={true} element={<UserHome />} />
          <Route path="login" element={<LoginPage user='user' />} />
          <Route path="signup" element={<UserSignUp />} />
          <Route path='fixture' element={<UserFixture />} />
          <Route path='search' element={<UserSearch />} />
          <Route path='fixtureDetails' element={<UserFixtureDetails />} />
          <Route path='clubDetails' element={<UserClubView />} />
          <Route path='community' element={<Community />} />
          <Route path='' element={<UserProtect />}>
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        <Route path='/admin'>
          <Route path='login' element={<AdminLogin />} />
          <Route element={<AdminProtect />}>
            <Route path='users' element={<AdminUsers />} />
            <Route path='clubs' element={<AdminClubs />} />
            <Route path='stadium' element={<StadiumTiming />} />
            <Route path='stadium/timings' element={<StadiumTiming />} />
            <Route path='stadium/banner' element={<StadiumBanner />} />
            <Route path='stadium/seats' element={<StadiumSeats />} />
          </Route>
        </Route>

        <Route path='/club'>
          <Route path='login' element={<LoginPage user='club' />} />
          <Route path='signup' element={<ClubSignUp />} />
          <Route element={<ClubProtect />}>
            <Route element={<ClubProfileHead />}>
              <Route path='profile' element={<ClubProfile />} />
              <Route path='profile/edit' element={<ClubProfileEdit />} />
              <Route path='profile/background' element={<ClubBackground />} />
            </Route>
            <Route path='fixture' element={<ClubFixtures />} />
            <Route path='fixture/newFixture' element={<ClubNewFixture />} />
            <Route path='team' element={<ClubTeamManagement />} />
            <Route path='paymentSuccess' element={<PaymentSuccess />} />
            <Route path='paymentFailed' element={<PaymentFailed />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  );
}