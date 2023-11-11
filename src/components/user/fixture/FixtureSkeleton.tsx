import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FixtureCardsSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow mt-10 p-4 animate__animated animate__fadeIn">
        <div className="lg:flex lg:justify-between lg:gap-2">
            <div className="lg:flex gap-20">
                <Skeleton  height={64} width={70} />
                <div className="flex justify-center  mt-5 lg:mt-0 items-center lg:ml-5 gap-3">
                    <Skeleton width={120} height={30}/>
                    <Skeleton width={120} height={30}/>
                </div>
            </div>

            <div className="lg:flex gap-20 items-center">
                <Skeleton width={230} />
                <div className="flex items-center mt-5 lg:mt-0 justify-center">
                    <Skeleton width={100} height={40} />
                </div>
            </div>
        </div>
    </div>
);

export default FixtureCardsSkeleton;
