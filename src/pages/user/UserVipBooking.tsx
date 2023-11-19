import NavBar from "../../components/user/NavBar";
import fBG2 from '../../assets/fixture/fBG2.png';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../api/user";
import NotFound from "../NotFound";
import FixtureDetailsHead from "../../components/user/fixture/fixtureDetails/FixtureDetailsHead";
import VipBooking from "../../components/user/booking/VipBooking";

const UserVipBooking = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const location = useLocation();
    const [showPage, setShowPage] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const fixtureId = queryParams.get("id");
    const stand = queryParams.get('stand');
    const section = queryParams.get('section');

    const { isLoading, data: bookingData } = useQuery({
        queryKey: ["bookingData", fixtureId],
        queryFn: getBooking,
    });

    useEffect(() => {
        if (!fixtureId || (bookingData?.data.fixture === null && !isLoading)) {
            setShowPage(false);
        }
        const standArr = ["north", "south", "east", "west"];

        if (stand && !standArr.includes(stand)) setShowPage(false);
        if (section && section !== 'vip') setShowPage(false);
    }, [fixtureId, bookingData, isLoading, stand, section]);


    return showPage ? (
        <div>
            <img src={fBG2} className="absolute top-0 left-0 w-full h-auto object-center" style={{ minHeight: '19rem' }} alt="Fixture Background" />
            <NavBar color={!isScrolled} fixed />
            <div className="mt-5 relative px-5 md:px-14 xl:px-28 py-28">
                {!isLoading && bookingData && bookingData.data && stand && section && <div>
                    <div>
                        <FixtureDetailsHead home={"Manchester United"} away={"Calicut FC"} />
                    </div>
                    <VipBooking seatData={bookingData.data.fixture.seats[stand][section]}
                        id={bookingData.data.fixture._id}
                        stand={stand}
                        section={section}
                        cartSeats={bookingData.data.vipCartSeats[stand]}
                    />
                </div>}

            </div>


        </div>
    ) : (
        <NotFound />
    );
};

export default UserVipBooking;
