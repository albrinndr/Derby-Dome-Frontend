import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RedeemCardSkeleton = () => {
    return (
        <div className="w-72 p-2 sm:p-3 rounded shadow hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="rounded flex flex-col items-center gap-3 py-8 justify-center bg-gradient-to-r from-rose-100 to-teal-100">
                <Skeleton height={24} width={120} />
                <Skeleton height={48} width={120} />
            </div>
            <div className="w-44 sm:w-full sm:flex justify-between items-center mt-3">
                <div>
                    <Skeleton height={16} width={100} />
                    <Skeleton height={12} width={120} />
                </div>
                <Skeleton circle={true} height={40} width={40} />
            </div>
        </div>
    );
};

export default RedeemCardSkeleton;
