import './App.css';
import { Toaster } from 'react-hot-toast';
import ClubRoutes from './routes/ClubRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
export default function App() {
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