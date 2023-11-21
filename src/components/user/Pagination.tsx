import React from "react";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex gap-2 items-center justify-center">
            <button
                className="bg-gray-200 text-gray-700 text-sm p-2 rounded-full"
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            >
                <AiOutlineLeft />
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`bg-${currentPage === number ? "gray-400 text-white" : "gray-200 text-gray-700"} text-sm p-2 rounded-full h-8 w-8`}
                    onClick={() => paginate(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className="bg-gray-200 text-gray-700 text-sm p-2 rounded-full"
                onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
            >
                <AiOutlineRight />
            </button>
        </div>
    );
};

export default Pagination;
