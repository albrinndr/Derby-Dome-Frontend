import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

interface RootState {
    auth: {
        cLoggedIn: boolean;
    };
}

const ClubProtect = () => {
    const { cLoggedIn } = useSelector((state: RootState) => state.auth);
    return (
        cLoggedIn ?
            <div className="bg-slate-100 bg-opacity-50 min-h-screen min-w-fit">
                <Outlet />

            </div>
            : <Navigate to='/club/login' replace />
    );

};

export default ClubProtect;
