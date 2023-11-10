import React, { useState, useEffect, FormEvent } from "react";
import seatImg from '../../../assets/stadium/seatImg.jpg';
import { GiConfirmed } from 'react-icons/gi';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllSeatPrice, setSeatPrice } from "../../../api/stadium";
import toast from "react-hot-toast";

interface Seat {
    stand: string;
    price: string;
}

const SeatForm = () => {
    const [north, setNorth] = useState("");
    const [south, setSouth] = useState("");
    const [east, setEast] = useState("");
    const [west, setWest] = useState("");

    const { isLoading, data: seats, refetch } = useQuery({ queryKey: ['seats'], queryFn: getAllSeatPrice });

    const { mutate } = useMutation({
        mutationFn: setSeatPrice,
        onSuccess: () => {
            toast.success('Price updated');
            refetch();
        }
    });

    useEffect(() => {
        if (!isLoading && seats?.data && seats.data.length > 0) {
            seats.data.map((seat: Seat) => {
                if (seat.stand == 'north') setNorth(seat.price);
                if (seat.stand == 'south') setSouth(seat.price);
                if (seat.stand == 'east') setEast(seat.price);
                if (seat.stand == 'west') setWest(seat.price);
            });
        }
    }, [isLoading, seats]);

    const submitHandler = (e: FormEvent<HTMLFormElement>, val: string) => {
        e.preventDefault();
        const data = { stand: val, price: 0 };
        if (val == 'north') data.price = Number(north);
        if (val == 'south') data.price = Number(south);
        if (val == 'east') data.price = Number(east);
        if (val == 'west') data.price = Number(west);
        mutate(data);
    };



    return (
        <div className=" border-2 border-gray-300 p-6 flex flex-col items-center rounded-md px-6 mb-10">
            <div className="mb-5">
                <img src={seatImg} alt="" width={300} className="rounded-sm" />
            </div>
            <div className="mb-5">
                <form onSubmit={(e) => submitHandler(e, 'north')}>
                    <label htmlFor="">North Stand: </label>
                    <input type="number" className="w-36 focus:outline-gray-400 mr-2 border border-1 border-gray-400 rounded h-10 pl-3" min={1} value={north} onChange={(e) => setNorth(e.target.value)} />
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-sm">
                        <GiConfirmed />
                    </button>
                </form>
            </div>
            <div className="mb-5">
                <form onSubmit={(e) => submitHandler(e, 'south')}>
                    <label htmlFor="">South Stand: </label>
                    <input type="number" className="w-36 focus:outline-gray-400 mr-2 border border-1 border-gray-400 rounded h-10 pl-3" min={1} value={south} onChange={(e) => setSouth(e.target.value)} />
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-sm">
                        <GiConfirmed />
                    </button>
                </form>
            </div>
            <div className="mb-5">
                <form onSubmit={(e) => submitHandler(e, 'east')}>
                    <label htmlFor="" className="mr-4">East Stand: </label>
                    <input type="number" className="w-36 focus:outline-gray-400 mr-2 border border-1 border-gray-400 rounded h-10 pl-3" min={1} value={east} onChange={(e) => setEast(e.target.value)} />
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-sm">
                        <GiConfirmed />
                    </button>
                </form>
            </div>
            <div className="mb-5">
                <form onSubmit={(e) => submitHandler(e, 'west')}>
                    <label htmlFor="" className="mr-2">West Stand: </label>
                    <input type="number" className="w-36 focus:outline-gray-400 mr-2 border border-1 border-gray-400 rounded h-10 pl-3" min={1} value={west} onChange={(e) => setWest(e.target.value)} />
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-sm">
                        <GiConfirmed />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SeatForm;
