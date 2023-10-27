import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserHome from './pages/user/UserHome';
import UserSignUp from './pages/user/UserSignUp';
import UserProfile from './pages/user/UserProfile';
import AdminBanner from './pages/admin/AdminBanner';
import AdminLogin from './pages/admin/AdminLogin';
import AdminUsers from './pages/admin/AdminUsers';
import AdminClubs from './pages/admin/AdminClubs';
import ClubSignUp from './pages/club/ClubSignUp';
import ClubProfile from './pages/club/ClubProfile';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
// import ImageTest from './ImageUpload';
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
          <Route path="profile" element={<UserProfile />} />
        </Route>

        <Route path='/admin'>
          <Route path='login' element={<AdminLogin />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='clubs' element={<AdminClubs />} />
          <Route path='stadium' element={<AdminBanner />} />
        </Route>

        <Route path='/club'>
          <Route path='login' element={<LoginPage user='club' />} />
          <Route path='signup' element={<ClubSignUp />} />
          <Route path='profile' element={<ClubProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <ImageTest /> */}
    </>

  );
}