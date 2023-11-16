import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface MessageSkeleton {
    own?: boolean;
}

const MessageSkeleton: React.FC<MessageSkeleton> = ({ own }) => {
    return (
        <div className={`flex flex-col mt-5 ${own ? 'items-end' : ''}`}>
            <div className="flex">
                {!own && (
                    <Skeleton className={`w-8 h-8 rounded-full object-cover mr-2 ${own ? 'ml-2' : 'mr-2'}`} />
                )}
                <div className={`p-2  max-w-xl rounded-b-lg ${own ? ''
                    : ' rounded-tr-lg'}`}>
                    <Skeleton className="text-sm font-semibold w-52 h-6 sm:w-72 sm:h-10" />
                </div>
                {own && (
                    <Skeleton className={`w-8 h-8 rounded-full object-cover mr-2 ${own ? 'ml-2' : 'mr-2'}`} />
                )}
            </div>
        </div>
    );
};

export default MessageSkeleton;
