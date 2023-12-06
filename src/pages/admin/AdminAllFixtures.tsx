import NavBar from "../../components/admin/NavBar";
import AllFixturesTable from "../../components/admin/allFixtures/AllFixtures";

const AdminAllFixtures = () => {
    return (
        <div className=" text-gray-900 bg-gradient-to-r from-rose-50 to-teal-50 w-screen">
            <NavBar />
            <AllFixturesTable />
        </div>
    );
};

export default AdminAllFixtures;
