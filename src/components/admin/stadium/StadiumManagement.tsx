import  { useState, useEffect } from "react";
import StadiumSeatPrice from "./StadiumSeatPrice";
import { useQuery } from "@tanstack/react-query";
import { getAllSeatPrice } from "../../../api/stadium";
import StadiumSeatPriceSkeleton from "./StadiumSeatPriceSkeleton";

interface Seat {
    stand: string,
    price: {
        vip: string;
        premium: string;
        economy: string;
    };
}

const StadiumManagement = () => {
    const { isLoading, data: seats, refetch } = useQuery({ queryKey: ['seats'], queryFn: getAllSeatPrice });
    const [standSeats, setStandSeats] = useState<Record<string, Seat>>({});

    useEffect(() => {
        if (seats && seats.data && !isLoading) {
            const updatedSeats: Record<string, Seat> = {};
            seats.data.forEach((seat: Seat) => {
                updatedSeats[seat.stand] = seat;
            });
            setStandSeats(updatedSeats);
        }
    }, [seats, isLoading]);


    return (
        <div className="mt-14 px-4 lg:px-14 mb-32">
            <h1 className="text-3xl text-gray-800 mb-5">Derby Stadium Seat Management</h1>
            {!isLoading ? <div className="sm:flex flex-wrap xl:flex-col sm:gap-5 xl:gap-0 justify-center items-center">
                <StadiumSeatPrice standName="north" seat={standSeats.north && standSeats.north} refetchFn={refetch} />
                <StadiumSeatPrice standName="south" seat={standSeats.south && standSeats.south} refetchFn={refetch} />
                <StadiumSeatPrice standName="east" seat={standSeats.east && standSeats.east} refetchFn={refetch} />
                <StadiumSeatPrice standName="west" seat={standSeats.west && standSeats.west} refetchFn={refetch} />
            </div> : <StadiumSeatPriceSkeleton />}

        </div>
    );
};

export default StadiumManagement;
