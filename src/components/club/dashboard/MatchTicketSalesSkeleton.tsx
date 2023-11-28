import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MatchTicketSalesSkeleton = () => {
    return (
        <div className="mt-8 border p-3 flex justify-between px-10 gap-5">
            <div className="flex gap-2 font-semibold">
                <h1 className="text-lg text-red-600 uppercase">
                    <Skeleton width={100} />
                </h1>
                <h1 className="text-lg text-gray-600 uppercase">
                    <Skeleton width={100} />
                </h1>
            </div>
            <div>
                <h1 className="font-semibold text-yellow-600">
                    <Skeleton width={100} />
                </h1>
            </div>
            <div className="flex font-semibold gap-2 items-center">

                <h2><Skeleton width={50} /> </h2>
            </div>
            <div className="flex font-semibold gap-2 items-center">
                <h2><Skeleton width={50} /> </h2>
            </div>
        </div>
    );
};

export default MatchTicketSalesSkeleton;
