import UserTable from "../../components/admin/allUsers/UserTable";
import NavBar from "../../components/admin/NavBar";

const AdminUsers = () => {
    return (
        <div className=" text-xl text-gray-900 font-semibold bg-gradient-to-r from-rose-50 to-teal-50 w-screen">
            <NavBar />
            <UserTable />
        </div>

    );
};

export default AdminUsers;
