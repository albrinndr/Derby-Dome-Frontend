import ClubTable from "../../components/admin/allUsers/ClubTable";
import NavBar from "../../components/admin/NavBar";

const AdminClubs = () => {
    return (
        <div className=" text-xl text-gray-900 font-semibold bg-gradient-to-r from-rose-50 to-teal-50 w-screen ">
            <NavBar />
            <ClubTable />
        </div>
    );
};

export default AdminClubs;
