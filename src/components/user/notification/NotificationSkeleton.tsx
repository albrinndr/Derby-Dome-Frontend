import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const NotificationSkeleton = () => (
    <div className="flex sm:items-center p-4 bg-white bg-opacity-70 rounded-lg shadow-xl mx-auto max-w-sm relative m-4">
        <Skeleton circle={true} width={48} height={48} />
        <div className="ml-2 cursor-pointer pb-2 pt-3">
            <Skeleton width={120} height={16} />
            <Skeleton count={2} width={180} />
        </div>
    </div>
);
export default NotificationSkeleton;
