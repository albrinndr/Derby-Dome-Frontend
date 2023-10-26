import Login from "../../components/user/Login";
import NavBar from "../../components/user/NavBar";

const UserLogin = () => {
  return (
    <>
      <NavBar color={true} fixed />
      <Login />
    </>
  );
};

export default UserLogin;
