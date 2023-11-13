import ClubTable from "../../components/admin/allUsers/ClubTable";
import NavBar from "../../components/admin/NavBar";

const AdminClubs = () => {
    return (
        <div className=" text-xl text-gray-900 font-semibold bg-slate-50 w-screen">
            <NavBar />
            <ClubTable />
        </div>
    );
};

export default AdminClubs;
