import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TicketsSkeleton = () => {
    return (
        <div className="mt-10">
            <div>
                <Skeleton height={40}/>
            </div>
            <div className="mt-6">
                <Skeleton height={80}/>
            </div>
        </div>
    );
};

export default TicketsSkeleton;
