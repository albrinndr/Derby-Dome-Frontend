import React, { ChangeEvent, useState, FormEvent } from 'react';
import { MdCurrencyRupee } from "react-icons/md";
import { GiCrownCoin } from "react-icons/gi";
import Loader from "../../common/Loader";
import toast from 'react-hot-toast';

interface OfferI {
    minPrice: string;
    discount: string;
    coins: string;
}

interface AddOfferModalI {
    closeFn: () => void;
    addOfferFn: (data: OfferI) => void;
}

const AddOfferModal: React.FC<AddOfferModalI> = ({ closeFn, addOfferFn }) => {

    const [formData, setFormData] = useState({
        coins: '',
        discount: '',
        minPrice: '',
    });
    const { coins, discount, minPrice } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (coins.trim().length < 1) {
            toast.error('Enter coins');
            return;
        } else if (discount.trim().length < 1) {
            toast.error('Enter discount');
        } else if (minPrice.trim().length < 1) {
            toast.error('Enter minimum purchase price');
            return;
        } else {
            addOfferFn(formData);
        }
    };

    return (
        <div className="fixed top-5 right-0  bg-black h-screen w-screen px-4 lg:px-14 pt-14 grid place-content-center bg-opacity-50">
            <div className="bg-green-200 rounded-t-lg py-3">
                <h1 className="text-center text-lg font-semibold text-gray-800">NEW REDEEM OFFER</h1>
            </div>
            <form className="bg-white shadow-md rounded-b-lg w-full  py-8 px-5 sm:px-12 text-gray-800 "
                onSubmit={submitHandler} >
                <div className="flex  flex-col flex-wrap justify-center xl:justify-evenly gap-5 ">
                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="coins">Coins: </label>
                        <div className="flex items-center">
                            <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><span className="text-yellow-500"><GiCrownCoin /></span></h1>
                            <input type="number" id='coins' min={1} className="border pl-2 w-40 h-10 rounded-r focus:outline-none"
                                value={coins} onChange={inputHandler} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="discount">Discount: </label>
                        <div className="flex items-center">
                            <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                            <input type="number" id='discount' min={1} className="border pl-2 w-40 h-10 rounded-r focus:outline-none"
                                value={discount} onChange={inputHandler} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <label htmlFor="minPrice">Min Purchase: </label>
                        <div className="flex items-center">
                            <h1 className="text-lg bg-gray-200 px-1 h-10 flex items-center rounded-l"><MdCurrencyRupee /></h1>
                            <input type="number" id='minPrice' min={1} className="border pl-2 w-40 h-10 rounded-r focus:outline-none"
                                value={minPrice} onChange={inputHandler} />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-center mt-5 gap-10">
                    <button className="w-32 bg-gray-400 text-white p-2 px-3 rounded hover:bg-gray-500"
                        type="button" onClick={() => closeFn()}>CANCEL</button>
                    <button className="w-32 bg-green-600 text-white p-2 px-3 rounded hover:bg-green-700" type="submit">ADD</button>

                </div>
            </form>
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default AddOfferModal;
