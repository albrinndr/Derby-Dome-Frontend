import React, { useState } from "react";
import NavBar from "../../components/user/NavBar";
// import fixtureBG from '../../assets/fixture/fixtureBG.png';
import FixtureHead from "../../components/user/fixture/FixtureHead";
import fBG2 from '../../assets/fixture/fBG2.png';
import FixtureContent from "../../components/user/fixture/FixtureContent";
// import fBGBlue from '../../assets/fixture/fBGBlue.png'

const UserFixture = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div>
            <img src={fBG2} className="absolute top-0 left-0 w-full h-auto object-center" style={{ minHeight: '19rem' }} alt="Fixture Background" />
            <NavBar color={!isScrolled} fixed />
            <div className="mt-12 relative p-4 md:p-14">
                <FixtureHead />
                <FixtureContent />
            </div>
        </div>
    );
};

export default UserFixture;
