import Login from "../../components/common/Login";
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
