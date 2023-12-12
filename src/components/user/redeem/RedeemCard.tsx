import React, { useState } from 'react';
import { GiCrownCoin } from "react-icons/gi";
import PurchaseConfirmationModal from './PurchaseConfirmationModal';
import { useMutation } from '@tanstack/react-query';
import { createUserCoupon } from '../../../api/user';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader';

interface OfferI {
    _id: string;
    coins: number;
    discount: number;
    minPrice: number;
}
interface RedeemCardI {
    offer: OfferI;
    userCoins: number;
    refetchFn: () => void;
    userRefetchFn: () => void;
}

const RedeemCard: React.FC<RedeemCardI> = ({ offer, userCoins, refetchFn, userRefetchFn }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const disabled = userCoins < offer.coins;
    const btnStyle = disabled ? 'bg-[#e6c396] cursor-not-allowed' : 'bg-[#F0AD4E] hover:bg-[#e99929]';


    const { status, mutate: purchaseMutate } = useMutation({
        mutationFn: createUserCoupon,
        onSuccess: ((res) => {
            if (res) {
                setShowConfirm(false);
                refetchFn();
                userRefetchFn();
                toast.success("Coupon purchased successfully!");
            }
        })
    });

    const purchaseHandler = () => {
        purchaseMutate(offer._id);
    };

    return (
        <div className=" w-72 p-2 sm:p-3 rounded shadow hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className=" rounded flex flex-col items-center gap-3 py-8 justify-center bg-gradient-to-r from-rose-100 to-teal-100">
                <h1 className="text-xl text-gray-700">Redeem coupon</h1>
                <h1 className="text-3xl font-semibold text-green-800">₹{offer.discount}</h1>
            </div>
            <div className="w-44 sm:w-full sm:flex justify-between items-center mt-3">
                <div>
                    <h5 className="text-gray-600">Min purchase. ₹{offer.minPrice}</h5>
                    <small className="text-gray-600">Expires within 20 days</small>
                </div>
                <button className={`sm:px-4 px-2 sm:mt-0 mt-1  sm:py-2 py-1 border flex items-center gap-2 rounded  transition-all duration-200 shadow ${btnStyle}`}
                    disabled={disabled} onClick={() => setShowConfirm(true)}>
                    <span className="text-slate-50">{offer.coins}</span> <span className="text-[#fae861] text-xl pt-1"><GiCrownCoin /></span>
                </button>
            </div>
            {showConfirm && <PurchaseConfirmationModal closeFn={() => setShowConfirm(false)} purchaseFn={purchaseHandler} />}
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default RedeemCard;
