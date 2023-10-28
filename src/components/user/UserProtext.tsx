import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

interface RootState {
    auth: {
        uLoggedIn: boolean;
    };
}

const UserProtect = () => {
    const { uLoggedIn } = useSelector((state: RootState) => state.auth);
    return uLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;

};

export default UserProtect;
