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

import StadiumBanner from './pages/stadium/StadiumBanner';
import StadiumTiming from './pages/stadium/StadiumTiming';

import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import ClubBackground from './pages/club/ClubBackground';

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
          </Route>
        </Route>

        <Route path='/club'>
          <Route path='login' element={<LoginPage user='club' />} />
          <Route path='signup' element={<ClubSignUp />} />
          <Route element={<ClubProtect />}>
            <Route path='profile' element={<ClubProfile />} />
            <Route path='profile/edit' element={<ClubProfileEdit />} />
            <Route path='profile/background' element={<ClubBackground />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  );
}