import React from "react";
import NavBarStadium from "../../components/admin/nav/NavBarStadium";
import StadiumDesign from "../../components/admin/seat/StadiumDesign";
import SeatForm from "../../components/admin/seat/SeatForm";

const StadiumSeats = () => {
    return (
        <div className="text-xl text-gray-900 font-semibold  w-screen">
            <NavBarStadium />
            <div className="lg:flex justify-center gap-20 md:p-14 p-4">
                <SeatForm />
                <StadiumDesign />
            </div>
        </div>
    );
};

export default StadiumSeats;
