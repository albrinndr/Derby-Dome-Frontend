import { useQuery } from "@tanstack/react-query";
import  { useState } from "react";
import { allTickets } from "../../../api/admin";
import TableSkeleton from "./TableSkeleton";
import TablePagination from "./TablePagination";


interface TicketI {
    _id: string;
    userId: { name: string; };
    fixtureId: {
        clubId: { name: string; };
        awayTeam: string;
        date: string;
        time: string;
    };
    stand: string;
    seats: [{
        row: string;
        userSeats: number[];
    }];
    qrCode: string;
    isCancelled: boolean;
}

const formatSeats = (seats: { row: string; userSeats: number[]; }[]) => {
    const formattedArray = seats.flatMap(({ row, userSeats }) =>
        userSeats.map((seat) => `${row}${seat}`)
    );
    return formattedArray.join(', ');
};

const formatTime = (GameTime: string) => {
    const originalTime: string = GameTime as string;
    const [hours, minutes] = originalTime.split(":");
    const formattedTime = new Date(0, 0, 0, parseInt(hours, 10), parseInt(minutes, 10)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};

const formatDate = (GameDate: string) => {
    const dateString = GameDate as string;
    const date = new Date(dateString);
    const monthAndDay = date.toLocaleDateString('en-US', {
        month: 'short', // or 'long' for full month name
        day: 'numeric',
    });
    const year = date.getUTCFullYear();
    return `${monthAndDay} ${year}`;
};

const AllTickets = () => {
    const { isLoading, data: ticketData } = useQuery({ queryKey: ['allTickets'], queryFn: allTickets });
    const [search, setSearch] = useState('');


    let tickets: TicketI[] = [];

    if (!isLoading && ticketData && ticketData.data) {
        tickets = ticketData.data;
    }

    const filteredTickets = tickets.filter((ticket: TicketI) => {
        const name = ticket.userId.name.toLowerCase();
        const searchValue = search.toLowerCase();
        return name.includes(searchValue);
    });

    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastTicket = currentPage * itemsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
    const paginatedTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container mx-auto px-4 lg:px-14">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">All Match Tickets</h2>
                    </div>
                    <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">


                        </div>
                        <div className="block relative w-full mt-10">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <div>
                                <input placeholder="Search by name"
                                    className="appearance-none w-60 rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2  bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none "
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} />
                            </div>

                        </div>
                    </div>
                    <div className=" flex gap-8 justify-center">
                        <div className="flex gap-3">
                            <div className="h-5 w-5 bg-green-600 opacity-50"></div>
                            <h1>Upcoming</h1>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-5 w-5 bg-yellow-600 opacity-50"></div>
                            <h1>Completed</h1>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-5 w-5 bg-red-600 opacity-50"></div>
                            <h1>Cancelled</h1>
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal font-semibold ">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Game
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Stand
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Seats
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Match Date
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Match Time
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            QR
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                {isLoading ?
                                    <TableSkeleton />
                                    :
                                    <tbody>
                                        {
                                            paginatedTickets.length > 0 && paginatedTickets.map((ticket: TicketI) => (
                                                <tr key={ticket._id}>
                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{ticket.userId.name}</p>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {ticket.fixtureId.clubId.name} vs {ticket.fixtureId.awayTeam}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {ticket.stand}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap flex flex-wrap" style={{ maxWidth: '10rem' }}>
                                                            {formatSeats(ticket.seats)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {formatDate(ticket.fixtureId.date)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {formatTime(ticket.fixtureId.time)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            <img className="h-20 w-20"
                                                                src="data:image/png;base64,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" alt="" />
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                        {
                                                            ticket.isCancelled ?
                                                                <span
                                                                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                                                >
                                                                    <span aria-hidden
                                                                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                                    <span className="relative"
                                                                    >Cancelled</span>
                                                                </span>
                                                                :
                                                                <>
                                                                    {new Date() > new Date(ticket.fixtureId.date) ?
                                                                        <span
                                                                            className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight"
                                                                        >
                                                                            <span aria-hidden
                                                                                className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                                                                            <span className="relative"
                                                                            >Completed</span>
                                                                        </span>
                                                                        :
                                                                        <span
                                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                                        >
                                                                            <span aria-hidden
                                                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                                            <span className="relative"
                                                                            >Active</span>
                                                                        </span>

                                                                    }

                                                                </>


                                                        }

                                                    </td>

                                                </tr>
                                            ))
                                        }

                                        {!paginatedTickets.length && (
                                            <tr className="">
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-full" colSpan={8}>
                                                    <div className="flex items-center justify-center">
                                                        <p className="text-gray-900 whitespace-no-wrap">No Tickets found</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                }

                            </table>
                            {paginatedTickets.length > 0 && <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <TablePagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={filteredTickets.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default AllTickets;
