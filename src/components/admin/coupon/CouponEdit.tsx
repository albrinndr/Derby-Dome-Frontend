import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdCurrencyRupee } from "react-icons/md";
import { editCoupon } from "../../../api/admin";
import Loader from "../../common/Loader";

interface CouponEditI {
    closeFn: () => void;
    coupon: {
        _id: string;
        name: string,
        desc: string;
        minPrice: string;
        discount: string;
        startingDate: string;
        endingDate: string;
        users: string[];
    };
    refetchFn: () => void;
    loaderFn: (val: boolean) => void;
}

const CouponEdit: React.FC<CouponEditI> = ({ closeFn, coupon, refetchFn, loaderFn }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [discount, setDiscount] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');

    useEffect(() => {
        setName(coupon.name);
        setDesc(coupon.desc);
        setDiscount(coupon.discount);
        setMinPrice(coupon.minPrice);
        const startingFormattedDate = new Date(coupon.startingDate).toISOString().split('T')[0];
        const endingFormattedDate = new Date(coupon.endingDate).toISOString().split('T')[0];

        setStartingDate(startingFormattedDate);
        setEndingDate(endingFormattedDate);
    }, [coupon]);

    const today = new Date().toISOString().split('T')[0];

    const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartingDate(e.target.value);
    };
    const handleStartingEndingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndingDate(e.target.value);
    };

    const { status, mutate: editCouponMutate } = useMutation({
        mutationFn: editCoupon,
        onSuccess: ((res) => {
            if (res) {
                refetchFn();
                loaderFn(false);
                toast.success('Coupon updated!');
            }
        })
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim().length < 1) {
            toast.error('Please enter coupon name');
            return;
        }
        if (desc.trim().length < 1) {
            toast.error('Please enter coupon description');
            return;
        }
        if (startingDate.trim().length < 1) {
            toast.error('Select starting date');
            return;
        }
        if (endingDate.trim().length < 1) {
            toast.error('Select ending date');
            return;
        }
        const data = {
            id: coupon._id,
            name: name.toUpperCase(),
            desc,
            minPrice,
            discount,
            startingDate,
            endingDate
        };
        editCouponMutate(data);
        closeFn();
        loaderFn(true);
    };

    return (
        <div className="fixed top-5 right-0  bg-black h-screen w-screen px-4 lg:px-14 pt-14 grid place-content-center bg-opacity-50">
            <form className="bg-white shadow-md rounded-lg w-full  p-5  text-gray-800 "
                onSubmit={submitHandler}>
                <div className="flex  flex-col flex-wrap justify-center xl:justify-evenly gap-5 ">
                    <div className="flex items-center gap-3">
                        <label htmlFor="name">Coupon name: </label>
                        <input type="text" id="name" className="border pl-2 border-gray-300 outline-none  h-10 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="desc">Description: </label>
                        <textarea id="desc" className="border pl-2 border-gray-300 outline-none  w-52 rounded"
                            value={desc} onChange={(e) => setDesc(e.target.value)} />

                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="discount">Discount: </label>
                        <div className="flex items-center">
                            <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                            <input type="number" min={1} className="border pl-2 w-40 h-10 rounded-r focus:outline-none"
                                value={discount} onChange={(e) => setDiscount(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="discount">Min Price: </label>
                        <div className="flex items-center">
                            <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                            <input type="number" min={1} className="border pl-2 w-40 h-10 rounded-r focus:outline-none"
                                value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="startDate">
                            Starting date:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            className="p-2 border border-gray-300 rounded-md w-48"
                            value={startingDate}
                            onChange={handleStartingDateChange}
                            min={today}
                        />
                    </div>

                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="startDate">
                            Ending date:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            className="p-2 border border-gray-300 rounded-md w-48"
                            value={endingDate}
                            onChange={handleStartingEndingDateChange}
                            min={today}
                        />
                    </div>
                </div>
                <div className=" flex justify-center mt-5 gap-10">
                    <button className="w-32 bg-gray-400 text-white p-2 px-3 rounded hover:bg-gray-500"
                        onClick={closeFn} type="button">CANCEL</button>
                    <button className="w-32 bg-green-600 text-white p-2 px-3 rounded hover:bg-green-700" type="submit">UPDATE</button>

                </div>
            </form>
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default CouponEdit;
