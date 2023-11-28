import React from "react";
import { BsGraphUpArrow, BsPeopleFill } from "react-icons/bs";
import { IoIosFootball } from "react-icons/io";

interface DashHeadI {
    salesCount: number;
    ticketsSold: number;
    totalClubs: number;
    totalUsers: number;
}

const DashHead:React.FC<DashHeadI> = ({salesCount,ticketsSold,totalClubs,totalUsers}) => {
    return (
        <div className='flex justify-between gap-16 md:gap-20 mb-10 mt-6 '>
            <div className='cursor-pointer bg-white bg-opacity-60 hover:bg-opacity-100 flex flex-col items-center shadow py-4 px-10 w-60 rounded-lg hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105'>
                <h1 className='text-xl font-semibold flex gap-3  items-center text-green-600'><span>Sales</span><BsGraphUpArrow /></h1>
                <div className='mt-2 text-center'>
                    <h1 className='text-xl font-semibold text-gray-700 tracking-wider'>₹ {salesCount}</h1>
                </div>
            </div>

            <div className='cursor-pointer bg-white bg-opacity-60 hover:bg-opacity-100 flex flex-col items-center shadow py-4 px-10 w-60 rounded-lg hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105'>
                <h1 className='text-xl font-semibold flex gap-3  items-center text-pink-700'><span>Tickets Sold</span><BsGraphUpArrow /></h1>
                <div className='mt-2 text-center'>
                    <h1 className='text-xl font-semibold text-gray-700 tracking-wider'>{ticketsSold}</h1>
                </div>
            </div>

            <div className='cursor-pointer bg-white bg-opacity-60 hover:bg-opacity-100 flex flex-col items-center shadow py-4 px-10 w-60 rounded-lg hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105'>
                <h1 className='text-xl font-semibold flex gap-3  items-center text-blue-700'><span>Clubs</span><IoIosFootball /></h1>
                <div className='mt-2 text-center'>
                    <h1 className='text-xl font-semibold text-gray-700 tracking-wider'>{totalClubs}</h1>
                </div>
            </div>

            <div className='cursor-pointer bg-white bg-opacity-60 hover:bg-opacity-100 flex flex-col items-center shadow py-4 px-10 w-60 rounded-lg hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105'>
                <h1 className='text-xl font-semibold flex gap-3  items-center text-yellow-500'><span>Users</span><BsPeopleFill /></h1>
                <div className='mt-2 text-center'>
                    <h1 className='text-xl font-semibold text-gray-700 tracking-wider'>{totalUsers}</h1>
                </div>
            </div>
        </div>
    );
};

export default DashHead;
