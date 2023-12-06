import ClubDetails from "../../components/user/club/ClubDetails";
import NotFound from "../NotFound";
import NavBar from "../../components/user/NavBar";
import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { clubDetails } from "../../api/user";
import ClubDetailsSkeleton from "../../components/user/club/ClubDetailsSkeleton";



const UserClubView = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const location = useLocation();
    const [showPage, setShowPage] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const clubId = queryParams.get("id");

    const { isLoading, data: clubData } = useQuery({
        queryKey: ["clubDetails", clubId],
        queryFn: clubDetails,
    });

    useEffect(() => {
        if (!clubId || (clubData?.data.club === null && !isLoading) || (clubData?.data === null && !isLoading)) {
            setShowPage(false);
        }
    }, [clubId, clubData, isLoading]);


    return showPage ? (
        <div>
            {isLoading &&
                <div className="px-5 md:px-14 xl:px-28 py-10 sm:py-16">
                    <ClubDetailsSkeleton />
                </div>
            }
            {clubData && clubData.data && !isLoading && clubData.data.club != null && <>
                <img src={clubData?.data.club.bgImg} className="absolute top-0 left-0 w-full h-64 object-cover" style={{ minHeight: '19rem' }} alt="Fixture Background" />
                <NavBar color={!isScrolled} fixed />
                <div className="mt-52 sm:mt-48 relative px-5 md:px-14 xl:px-28 py-10 sm:py-20">
                    <ClubDetails clubData={clubData?.data} />
                </div>
            </>}
        </div>
    ) : (
        <NotFound />
    );
};

export default UserClubView;
