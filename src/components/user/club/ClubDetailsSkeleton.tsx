import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ClubDetailsSkeleton = () => {
    return (
        <div>
            <Skeleton height={200} />

            <div className='mt-10'>
                <Skeleton height={30} width={200} />
                <Skeleton height={20} width={200} />
                <Skeleton height={20} width={200} />
            </div>
            <div className="mt-10">
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={50} />
                
            </div>

        </div>
    );
};

export default ClubDetailsSkeleton;
