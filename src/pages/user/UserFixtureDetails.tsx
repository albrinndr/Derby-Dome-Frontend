import FixtureDetailsContent from "../../components/user/fixture/fixtureDetails/FixtureDetailsContent";
import NavBar from "../../components/user/NavBar";
import fBG2 from '../../assets/fixture/fBG2.png';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fixtureDetails } from "../../api/user";
import NotFound from "../NotFound";
import FixtureDetailsSkeleton from "../../components/user/fixture/fixtureDetails/FixtureDetailsSkeleton";


const UserFixtureDetails = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const location = useLocation();
    const [showPage, setShowPage] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const fixtureId = queryParams.get("id");

    const { isLoading, data: fixtureData } = useQuery({
        queryKey: ["fixtureData", fixtureId],
        queryFn: fixtureDetails,
    });

    useEffect(() => {
        if (!fixtureId || (fixtureData?.data === null && !isLoading)) {
            setShowPage(false);
        }
    }, [fixtureId, fixtureData, isLoading]);

    return showPage ? (
        <div>
            <img src={fBG2} className="absolute top-0 left-0 w-full h-auto object-center" style={{ minHeight: '19rem' }} alt="Fixture Background" />
            <NavBar color={!isScrolled} fixed />
            <div className="mt-5 relative px-5 md:px-14 xl:px-28 py-28">
                {!isLoading ? <FixtureDetailsContent fixtureData={fixtureData?.data} /> : <FixtureDetailsSkeleton />}
            </div>


        </div>
    ) : (
        <NotFound />
    );
};

export default UserFixtureDetails;

