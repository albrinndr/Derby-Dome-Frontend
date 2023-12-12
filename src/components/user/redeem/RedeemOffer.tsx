import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import RedeemCouponTable from "./RedeemCouponTable";
import RedeemCard from "./RedeemCard";
import { useQuery } from "@tanstack/react-query";
import { userRedeem } from "../../../api/user";
import noOffersImg from '../../../assets/noOffers.svg';
import RedeemCardSkeleton from "./RedeemCardSkeleton";
import React from 'react';

interface OfferI {
    _id: string;
    coins: number;
    discount: number;
    minPrice: number;
}

interface RedeemOfferI {
    coins: number;
    userRefetchFn: () => void;
}


const RedeemOffer: React.FC<RedeemOfferI> = ({ coins, userRefetchFn }) => {
    const [showTable, setShowTable] = useState(false);

    const { isLoading, data: userRedeemData, refetch } = useQuery({ queryKey: ['userCoinRedeem'], queryFn: userRedeem });

    let loyaltyOffers: OfferI[] = [];
    if (userRedeemData && userRedeemData.data && userRedeemData.data.offers && userRedeemData.data.offers.length > 0) {
        loyaltyOffers = userRedeemData.data.offers;
    }

    return (
        <div className="bg-white rounded shadow w-full pt-8 px-7 pb-10">
            <h1 className="text-center text-xl font-semibold">Redeem Your Derby Coins</h1>

            <div>
                {!showTable ? <div className="border shadow-sm py-2 mt-4 rounded px-5 flex items-center justify-between" onClick={() => setShowTable(true)}>
                    <h1 className="text-gray-800 text-sm sm:text-lg">Show your coupons</h1><FaChevronDown />
                </div>
                    :
                    <>
                        <div className="border shadow-sm py-2 mt-4 mb-5 rounded px-5 flex items-center justify-between" onClick={() => setShowTable(false)}>
                            <h1 className="text-gray-800 text-md">Hide table</h1><FaChevronUp />
                        </div>
                        {
                            userRedeemData && userRedeemData.data && userRedeemData.data.coupons &&
                            <RedeemCouponTable isLoading={isLoading} coupons={userRedeemData.data.coupons} />
                        }
                    </>
                }
            </div>

            {
                !isLoading ?
                    < div className="mt-10 p-5 flex flex-wrap gap-10 justify-center sm:justify-start">
                        {
                            loyaltyOffers.length > 0 ?
                                <>
                                    {
                                        loyaltyOffers.map((offer: OfferI, i: number) => (

                                            <RedeemCard offer={offer} key={i} userCoins={coins} refetchFn={refetch} userRefetchFn={userRefetchFn} />
                                        ))
                                    }
                                </> :
                                <>
                                    <div className="flex flex-col items-center gap-4 w-full">
                                        <img src={noOffersImg} alt="" />
                                        <h1 className="sm:text-xl font-semibold text-pink-500 text-center">
                                            No offers available. Stay tuned!
                                        </h1>
                                    </div>
                                </>
                        }

                    </div> :
                    < div className="mt-10 p-5 flex flex-wrap gap-10 justify-center sm:justify-start">
                        <RedeemCardSkeleton />
                        <RedeemCardSkeleton />
                        <RedeemCardSkeleton />
                    </div>
            }
        </div >
    );
};

export default RedeemOffer;
