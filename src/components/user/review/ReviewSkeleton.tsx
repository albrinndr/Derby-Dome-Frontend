import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReviewSkeleton = () => {
    return (
        <div className="bg-white px-5 py-4 rounded mb-5">
            <div className="flex gap-3">
                <div className="">
                    <Skeleton circle={true} width={40} height={40} />
                </div>
                <div className="text-gray-800">
                    <div className="flex items-center gap-1">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={100} height={20} />
                    </div>
                    <Skeleton width={70} height={15} />
                </div>
            </div>
            <div className="mt-2 text-gray-700 text-sm">
                <Skeleton count={3} />
            </div>
        </div>
    );
};

export default ReviewSkeleton;
