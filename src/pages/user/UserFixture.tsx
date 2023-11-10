import React, { useState } from "react";
import NavBar from "../../components/user/NavBar";
import FixtureFilter from "../../components/user/fixture/FixtureFilter";
// import fixtureBG from '../../assets/fixture/fixtureBG.png';
import FixtureHead from "../../components/user/fixture/FixtureHead";
import fBG2 from '../../assets/fixture/fBG2.png';
// import fBGBlue from '../../assets/fixture/fBGBlue.png'
import FixtureCards from "../../components/user/fixture/FixtureCards";
import FixturePagination from "../../components/user/fixture/FixturePagination";

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
                <FixtureFilter />
                <div>
                    <FixtureCards />
                    <FixtureCards />
                    <FixtureCards />
                    <FixtureCards />
                    <FixtureCards />
                    <FixtureCards />
                    <FixtureCards />
                    <FixtureCards />
                </div>
                <div className="mt-5">
                    <FixturePagination />
                </div>
            </div>
        </div>
    );
};

export default UserFixture;
