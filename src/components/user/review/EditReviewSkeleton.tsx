import { Typography } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const EditReviewSkeleton = () => {
    return (
        <div>
            <div className="sm:flex gap-2">
                <Typography component="legend">Select Rating: </Typography>
                {/* Rating Skeleton */}
                <Skeleton width={200} height={30} />
            </div>
            <div className="mt-3">
                <p>Write your review: </p>
                {/* Textarea Skeleton */}
                <Skeleton height={100} />
            </div>
            <div>
                {/* Button Skeleton */}
                <Skeleton width={100} height={40} />
            </div>
        </div>
    );
};

export default EditReviewSkeleton;
