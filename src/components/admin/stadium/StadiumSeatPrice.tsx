import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { setSeatPrice } from "../../../api/stadium";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";

interface StadiumSeatPrice {
    standName: string;
    seat?: {
        stand: string,
        price: {
            vip: string;
            premium: string;
            economy: string;
        };
    };
    refetchFn: () => void;
}

const StadiumSeatPrice: React.FC<StadiumSeatPrice> = ({ standName, seat, refetchFn }) => {
    const name = standName.charAt(0).toUpperCase() + standName.slice(1);

    const [vip, setVip] = useState('');
    const [premium, setPremium] = useState('');
    const [economy, setEconomy] = useState('');
    useEffect(() => {
        if (seat) {
            seat.price.vip && setVip(seat.price.vip);
            seat.price.premium && setPremium(seat.price.premium);
            seat.price.economy && setEconomy(seat.price.economy);
        }
    }, [seat]);

    const { status, mutate } = useMutation({
        mutationFn: setSeatPrice,
        onSuccess: () => {
            toast.success('Price updated');
            refetchFn();
        }
    });

    const updateHandler = (e: FormEvent<HTMLFormElement>, val: string, price: string) => {
        e.preventDefault();
        if (!price) {
            toast.error('Price must not be empty!');
            return;
        }
        const data = {
            stand: standName,
            seatName: val,
            price: price
        };
        mutate(data);

    };

    return (
        <div className=" shadow-md  text-gray-700 bg-white px-5 py-7 rounded-lg w-fit xl:mt-10 ">
            <h1 className="font-semibold text-2xl text-gray-600">{name} Stand Seats</h1>
            <div className="mt-5 xl:flex gap-10">

                <form className="flex gap-4 items-center mt-5 xl:mt-0" onSubmit={(e) => updateHandler(e, 'vip', vip)}>
                    <h1 className="text-lg w-20 xl:w-auto">VIP Seats (A - B) : </h1>
                    <div className="flex items-center">
                        <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                        <input type="number" min={1} className="border w-20 h-10 rounded-r focus:outline-none pl-1"
                            value={vip} onChange={(e) => setVip(e.target.value)} />
                    </div>
                    <button className="bg-green-600 text-white p-2 px-3 rounded hover:bg-green-700"
                    >Update</button>
                </form>

                <form className="flex gap-4 items-center mt-5 xl:mt-0" onSubmit={(e) => updateHandler(e, 'premium', premium)}>
                    <h1 className="text-lg w-20 xl:w-auto">Premium Seats (C - F) : </h1>
                    <div className="flex items-center">
                        <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                        <input type="number" min={1} className="border w-20 h-10 rounded-r focus:outline-none pl-1"
                            value={premium} onChange={(e) => setPremium(e.target.value)} />
                    </div>
                    <button className="bg-green-600 text-white p-2 px-3 rounded hover:bg-green-700"
                    >Update</button>
                </form>

                {standName != 'east' && <form className="flex gap-4 items-center mt-5 xl:mt-0" onSubmit={(e) => updateHandler(e, 'economy', economy)}>
                    <h1 className="text-lg w-20 xl:w-auto">Economy Seats (G - H) : </h1>
                    <div className="flex items-center">
                        <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                        <input type="number" min={1} className="border w-20 h-10 rounded-r focus:outline-none pl-1"
                            value={economy} onChange={(e) => setEconomy(e.target.value)} />
                    </div>
                    <button className="bg-green-600 text-white p-2 px-3 rounded hover:bg-green-700"
                    >Update</button>
                </form>}

            </div>
            {status === 'pending' && <Loader/>}
        </div>
    );
};

export default StadiumSeatPrice;
