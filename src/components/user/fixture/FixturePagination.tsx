import React from "react";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const FixturePagination = () => {
    return (
        <div className="flex gap-2 items-center justify-center">
            <button className="bg-gray-200 text-gray-700 text-sm  p-2 rounded-full" >
                <AiOutlineLeft />
            </button>
            <button className="bg-green-700 text-white grid place-content-center text-sm  p-2 rounded-full h-8 w-8">
                1
            </button>
            <button className="bg-gray-200 text-gray-700 grid place-content-center text-sm  p-2 rounded-full h-8 w-8">
                2
            </button>

            <button className="bg-gray-200 text-gray-700  text-sm  p-2 rounded-full" >
                <AiOutlineRight />
            </button>
        </div>
    );
};

export default FixturePagination;
