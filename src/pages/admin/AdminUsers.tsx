import UserTable from "../../components/admin/UserTable";
import NavBar from "../../components/admin/NavBar";

const AdminUsers = () => {
    return (
        <div className=" text-xl text-gray-900 font-semibold bg-slate-50 w-screen">
            <NavBar />
            <UserTable />
        </div>

    );
};

export default AdminUsers;
