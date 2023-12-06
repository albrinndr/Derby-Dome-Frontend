import  { useState, useEffect } from "react";
import NavBarFull from "../navbar/NavBarFull";
import FixtureMenu from "../fixture/FixtureMenu";

const CommonHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      < NavBarFull color={isScrolled} />
      <div className="relative z-10" style={{ marginTop: "-20px" }} >
        <FixtureMenu />
      </div>
    </>
  );
};

export default CommonHeader;
