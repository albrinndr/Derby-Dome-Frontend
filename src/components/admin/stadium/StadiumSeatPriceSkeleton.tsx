import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StadiumSeatPriceSkeleton = () => {
    return (
        <div className="sm:flex flex-wrap xl:flex-col sm:gap-5 xl:gap-0 justify-center items-center">
            <div className="w-full rounded-sm mt-10">
                <Skeleton height={100}/>
            </div>
            <div className="w-full rounded-sm mt-10">
                <Skeleton height={100}/>
            </div>
            <div className="w-full rounded-sm mt-10">
                <Skeleton height={100}/>
            </div>
            <div className="w-full rounded-sm mt-10">
                <Skeleton height={100}/>
            </div>
        </div>
    );
};

export default StadiumSeatPriceSkeleton;
