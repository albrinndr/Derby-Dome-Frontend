import NavBar from "../../components/admin/NavBar";
import AllTickets from "../../components/admin/tickets/AllTickets";

const AdminTickets = () => {
    return (
        <div className=" text-gray-900 bg-gradient-to-r from-rose-50 to-teal-50 w-screen">
            <NavBar />
            <AllTickets />
        </div>
    );
};

export default AdminTickets;
