import './App.css';
import { Toaster } from 'react-hot-toast';
import ClubRoutes from './routes/ClubRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';

import { getNotificationToken } from "./firebase";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setClientBrowserToken } from './api/user';

interface RootState {
  auth: {
    uLoggedIn: boolean;
  };
}
export default function App() {
  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const setBrowserToken = async () => {
    try {
      const token = await getNotificationToken();
      if (token) {
        await setClientBrowserToken(token);
        console.log('token done');

      } else {
        console.log('no token');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Notification.permission !== 'granted') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            setBrowserToken();
          } else {
            console.log('Notification permission denied');
          }
        } else {
          setBrowserToken();
        }
      } catch (error) {
        console.log('Error requesting notification permission:', error);
      }
    };

    if (uLoggedIn) {
      console.log('notification useEffect working...');
      requestNotificationPermission();
    }
  }, [uLoggedIn]);

  return (
    <>
      <Toaster position="top-right"
        reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path='/club/*' element={<ClubRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </>
  );
}