import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import SideBar from "./SideBar";


interface RootState {
    auth: {
        aLoggedIn: boolean;
    };
}

const AdminProtect = () => {
    const { aLoggedIn } = useSelector((state: RootState) => state.auth);
    return (
        aLoggedIn ?
            <section className="flex">
                <SideBar />

                <Outlet />

            </section>
            : <Navigate to='/admin/login' replace />
    );

};

export default AdminProtect;
