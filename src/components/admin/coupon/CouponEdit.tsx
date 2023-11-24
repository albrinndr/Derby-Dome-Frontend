import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdCurrencyRupee } from "react-icons/md";

interface CouponEditI {
    closeFn: () => void;
}

const CouponEdit: React.FC<CouponEditI> = ({ closeFn }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [discount, setDiscount] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const handleStartingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartingDate(e.target.value);
    };
    const handleStartingEndingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndingDate(e.target.value);
    };

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
        console.log(name);
        console.log(desc);
        console.log(minPrice);
        console.log(discount);
        console.log(startingDate);
        console.log(endingDate);
    };

    return (
        <div className="fixed top-5 right-0  bg-black h-screen w-screen px-4 lg:px-14 pt-14 grid place-content-center bg-opacity-50">
            <form className="bg-white shadow-md rounded-lg w-full  p-5  text-gray-800 "
                onSubmit={submitHandler}>
                <div className="flex  flex-col flex-wrap justify-center xl:justify-evenly gap-5 ">
                    <div className="flex items-center gap-3">
                        <label htmlFor="name">Coupon name: </label>
                        <input type="text" id="name" className="border border-gray-300 outline-none  h-10 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="desc">Description: </label>
                        <textarea id="desc" className="border border-gray-300 outline-none  w-52 rounded"
                            value={desc} onChange={(e) => setDesc(e.target.value)} />

                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="discount">Discount: </label>
                        <div className="flex items-center">
                            <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                            <input type="number" min={1} className="border w-20 h-10 rounded-r focus:outline-none pl-1"
                                value={discount} onChange={(e) => setDiscount(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="discount">Min Price: </label>
                        <div className="flex items-center">
                            <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                            <input type="number" min={1} className="border w-20 h-10 rounded-r focus:outline-none pl-1"
                                value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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

                    <div className="flex items-center gap-2">
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

        </div>
    );
};

export default CouponEdit;
