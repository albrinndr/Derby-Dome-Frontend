import NavBar from "../../components/user/NavBar";
import fBG2 from '../../assets/fixture/fBG2.png';
import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../api/user";
import NotFound from "../NotFound";
import BookingSection from "../../components/user/booking/BookingSection";
import FixtureDetailsHead from "../../components/user/fixture/fixtureDetails/FixtureDetailsHead";
import BookingSkeleton from "../../components/user/booking/BookingSkeleton";

const UserBooking = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const location = useLocation();
    const [showPage, setShowPage] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const fixtureId = queryParams.get("id");

    const { refetch, isLoading, data: bookingData } = useQuery({
        queryKey: ["bookingData", fixtureId],
        queryFn: getBooking,
    });

    useEffect(() => {
        if (!fixtureId || (bookingData?.data.fixture === null && !isLoading)) {
            setShowPage(false);
        }
    }, [fixtureId, bookingData, isLoading]);

    return showPage ? (
        <div>
            <img src={fBG2} className="absolute top-0 left-0 w-full h-auto object-center" style={{ minHeight: '19rem' }} alt="Fixture Background" />
            <NavBar color={!isScrolled} fixed />
            <div className="mt-5 relative px-5 md:px-14 xl:px-28 py-28">
                {isLoading ? <BookingSkeleton /> : <>
                    {bookingData && bookingData.data && <div>
                        <div>
                            <FixtureDetailsHead home={bookingData?.data.fixture.clubId.name} away={bookingData?.data.fixture.awayTeam} />
                        </div>
                        <BookingSection data={bookingData.data} refetchFn={refetch} />
                    </div>
                    }
                </>}

            </div>


        </div>
    ) : (
        <NotFound />
    );
};

export default UserBooking;
