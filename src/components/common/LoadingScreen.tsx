import React from 'react';

interface LoadingProps {
    size: number;
}

const LoadingScreen: React.FC<LoadingProps> = ({ size }) => {

    return (
        <div className="w-full h-full grid place-content-center fixed top-0 left-0 bg-white bg-opacity-50 flex-center">
            <div
                style={{ width: `${size}px`, height: `${size}px` }}
                className="animate-spin">
                <div className="h-full w-full border-4 border-t-purple-500
       border-b-purple-700 rounded-[50%]">
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
