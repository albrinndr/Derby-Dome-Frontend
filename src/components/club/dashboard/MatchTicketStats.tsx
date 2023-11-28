import React from "react";
import { BsGraphDown, BsGraphUpArrow } from "react-icons/bs";

interface MatchTicketStatsI {
    homeTeam: string;
    awayTeam: string;
    date: string;
    price: string;
    ticketProfit: number;

}

const MatchTicketStats: React.FC<MatchTicketStatsI> = ({ homeTeam, awayTeam, date, price, ticketProfit }) => {
    const matchDate = new Date(date);
    const formattedDate = matchDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className='mt-8 border p-3 flex justify-between px-10 gap-5'>
            <div className='flex gap-2  font-semibold'>
                <h1 className='text-lg text-red-600 uppercase'>{homeTeam}</h1>
                <h5>vs</h5>
                <h1 className='text-lg text-gray-600 uppercase'>{awayTeam}</h1>
            </div>
            <div>
                <h1 className='font-semibold text-yellow-600'>{formattedDate}</h1>
            </div>
            <div className='flex font-semibold gap-2 items-center'>
                <h1 className='text-blue-600 flex items-center gap-1'><BsGraphDown />Payment: </h1> <h2>₹{price}</h2>
            </div>
            <div className='flex font-semibold gap-2  items-center'>
                <h1 className='text-green-600 flex items-center gap-1'><BsGraphUpArrow />Tickets sales: </h1> <h2>₹{ticketProfit}</h2>
            </div>
        </div>
    );
};

export default MatchTicketStats;
