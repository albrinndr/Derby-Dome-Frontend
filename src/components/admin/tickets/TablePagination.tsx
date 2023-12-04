import React from "react";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


interface TablePagination {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const TablePagination: React.FC<TablePagination> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
             <button
                className="bg-gray-200 text-gray-700 text-sm p-2 rounded-full"
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            >
                <AiOutlineLeft />
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`bg-${currentPage === number ? "gray-400 text-white" : "gray-200 text-gray-700"} text-sm p-1 rounded-full h-8 w-8 mx-2`}
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

export default TablePagination;
