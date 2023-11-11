import React from "react";
import Skeleton from "react-loading-skeleton";

const ProfileClubEditSkeleton = () => {
    return (
        <div className="px-4 md:px-14 mt-12">
            <div className="p-6 text-center">
                <div className="flex justify-center gap-10 md:gap-20">
                    <div className="hidden sm:block">
                        <Skeleton circle height={150} width={150} />
                        <div className="mt-10 relative flex items-center justify-center">
                        <Skeleton  height={30} width={150} />
                            
                        </div>
                    </div>
                    <div className="">
                        <div className="md:flex">
                            <Skeleton height={32} width={180} />
                            <Skeleton height={32} width={180} />
                        </div>
                        <div className="md:flex">
                            <Skeleton height={32} width={180} />
                            <Skeleton height={32} width={180} />
                        </div>
                        <div className="md:flex">
                            <Skeleton height={80} width={180} />
                            <Skeleton height={80} width={180} />
                        </div>
                        <div className="md:flex">
                            <Skeleton height={32} width={180} />
                            <Skeleton height={32} width={180} />
                        </div>
                        <br />
                        <div className="sm:hidden flex items-center">
                            <Skeleton circle height={100} width={100} />
                            <div className="mt-10 relative flex items-center justify-center">
                                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg">
                                    Change
                                </label>
                            </div>
                        </div>
                        <Skeleton height={40} width={180} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileClubEditSkeleton;
