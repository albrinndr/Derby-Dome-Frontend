import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const FixtureDetailsSkeleton = () => {
    return (
        <div className="mt-20">
            <div className="sm:py-10 pt-10 pb-10">
                <div>
                    <Skeleton width={300}/>
                </div>
            </div>
            <div className=" p-2 lg:flex lg:flex-row-reverse justify-between gap-10">

                <div className="p-4 lg:w-1/3 bg-white rounded shadow h-fit">
                    <div className=" ">
                        <Skeleton height={130} />
                    </div>
                    <div className="mt-5 flex gap-2">
                        <div className="flex-col  justify-center shadow text-center h-fit w-28 py-3 items-center px-2 bg-green-100  rounded-md leading-5">
                            <Skeleton />
                        </div>
                        <div className="shadow-sm px-2 w-full py-2 text-start">
                            <Skeleton height={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Skeleton height={30} />
                    </div>
                </div>
                <div className="bg-white px-3 py-5 rounded shadow lg:w-2/3">
                    <div className="p-3 sm:text-lg">
                        <Skeleton />

                    </div>
                    <div className="text-xl text-gray-800 border-b p-3">
                        <Skeleton />
                    </div>

                    {/* home team players */}
                    <div className="mt-6 mb-5 bg-green-50 p-2">
                        <Skeleton />
                    </div>
                    <div className="flex justify-center flex-wrap gap-3">
                        <div className="flex items-center gap-2 w-52 px-2 py-1">
                            <Skeleton width={100} height={20} />
                        </div>
                        <div className="flex items-center  gap-2 w-52 px-2 py-1">
                            <Skeleton width={100} height={20} />
                        </div>
                        <div className="flex items-center  gap-2 w-52 px-2 py-1">
                            <Skeleton width={100} height={20} />
                        </div>
                        <div className="flex items-center  gap-2 w-52 px-2 py-1">
                            <Skeleton width={100} height={20} />
                        </div>

                    </div>


                </div>
            </div>
        </div>

    );
};

export default FixtureDetailsSkeleton;
