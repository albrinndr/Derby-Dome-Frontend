import Login from "../../components/common/Login";
import NavBar from "../../components/user/NavBar";
import  { useState } from "react";


const ClubLogin = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <>
      <NavBar color={!isScrolled} fixed />

      <Login />
    </>
  );
};

export default ClubLogin;
