import Skeleton from "react-loading-skeleton";

const SearchSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 p-10 items-center">
            <div className="w-full sm:w-auto md:w-full lg:w-full shadow hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
                <Skeleton height={160} />
                <div className="bg-white pb-4">
                    <div className="p-4 px-7">
                        <Skeleton height={20} width={180} />
                        <div className="flex mt-3">
                            <div>
                                <Skeleton circle height={20} width={20} />
                            </div>
                            <div>
                                <Skeleton height={16} width={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-auto md:w-full lg:w-full shadow hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
                <Skeleton height={160} />
                <div className="bg-white pb-4">
                    <div className="p-4 px-7">
                        <Skeleton height={20} width={180} />
                        <div className="flex mt-3">
                            <div>
                                <Skeleton circle height={20} width={20} />
                            </div>
                            <div>
                                <Skeleton height={16} width={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-auto md:w-full lg:w-full shadow hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
                <Skeleton height={160} />
                <div className="bg-white pb-4">
                    <div className="p-4 px-7">
                        <Skeleton height={20} width={180} />
                        <div className="flex mt-3">
                            <div>
                                <Skeleton circle height={20} width={20} />
                            </div>
                            <div>
                                <Skeleton height={16} width={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSkeleton;
