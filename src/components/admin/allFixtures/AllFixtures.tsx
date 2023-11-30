import { useState } from "react";
import { allClubFixtures } from "../../../api/admin";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../common/Loader";
import TablePagination from "./TablePagination";
import TableSkeleton from "./TableSkeleton";


interface Fixture {
    clubId: {
        name: string;
        image: string;
    };
    awayTeam: string;
    date: string;
    time: string;
    price: number;
    status: string;
    createdAt: string;
}

const formatCreatedAtDate = (createdAt: string) => {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };
    const date = new Date(createdAt);

    return date.toLocaleDateString('en-US', options);
};


const formatTimeTo12Hour = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
};

const AllFixturesTable = () => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('scheduled');
    const { isLoading, data: allFixtures } = useQuery({ queryKey: ['allFixtures'], queryFn: allClubFixtures });

    let fixtures = [];

    if (allFixtures && allFixtures.data) {
        if (sortBy === "scheduled") {
            fixtures = allFixtures.data.sort((a: Fixture, b: Fixture) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateB.getTime() - dateA.getTime();
            });
        } else {
            fixtures = allFixtures.data.sort((a: Fixture, b: Fixture) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                return dateB.getTime() - dateA.getTime();
            });
        }

    }


    const filteredFixtures = fixtures.filter((fixture: Fixture) => {
        const homeTeam = fixture.clubId.name.toLowerCase();
        const awayTeam = fixture.awayTeam.toLowerCase();
        const searchValue = search.toLowerCase();
        return homeTeam.includes(searchValue) || awayTeam.includes(searchValue);
    });


    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastFixture = currentPage * itemsPerPage;
    const indexOfFirstFixture = indexOfLastFixture - itemsPerPage;
    const paginatedFixtures = filteredFixtures.slice(indexOfFirstFixture, indexOfLastFixture);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container mx-auto px-4 lg:px-14">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">All Scheduled Fixtures</h2>
                    </div>
                    <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">


                        </div>
                        <div className="block relative w-full">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <div className="flex justify-between gap-5">
                                <div>
                                    <input placeholder="Search"
                                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none "
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)} />
                                </div>

                                <div>
                                    <span className="font-normal text-gray-700 ">Sort By:</span>
                                    <select className=" shadow-sm font-normal text-gray-700  focus:outline-none py-1 px-3 rounded ml-2 border" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                        <option value="scheduled">Scheduled Date</option>
                                        <option value="game">Game Date</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" flex gap-8 justify-center">
                        <div className="flex gap-3">
                            <div className="h-5 w-5 bg-green-600 opacity-50"></div>
                            <h1>Upcoming Match</h1>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-5 w-5 bg-yellow-600 opacity-50"></div>
                            <h1>Past Match</h1>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-5 w-5 bg-red-600 opacity-50"></div>
                            <h1>Cancelled Match</h1>
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal font-semibold ">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Home Team
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Away Team
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Game Date
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Time
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Scheduled Date
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
                                            paginatedFixtures.map((fixture: Fixture, i: number) => (
                                                <tr key={i}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                <img className="w-full h-full rounded-full"
                                                                    src={fixture.clubId.image}
                                                                    alt="no image" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {fixture.clubId.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex">
                                                            <p className="text-gray-900 whitespace-no-wrap">{fixture.awayTeam}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {formatCreatedAtDate(fixture.date)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {formatTimeTo12Hour(fixture.time)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            ₹{fixture.price}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {formatCreatedAtDate(fixture.createdAt)}
                                                        </p>
                                                    </td>
                                                    {new Date(fixture.date) > new Date() ? <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        {
                                                            fixture.status === "cancelled" ?
                                                                <span
                                                                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                                                >
                                                                    <span aria-hidden
                                                                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                                    <span className="relative"
                                                                    >Cancelled</span>
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
                                                    </td> :
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            {
                                                                fixture.status === "cancelled" ?
                                                                    <span
                                                                        className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                                                    >
                                                                        <span aria-hidden
                                                                            className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                                                                        <span className="relative"
                                                                        >Cancelled</span>
                                                                    </span>
                                                                    :
                                                                    <span
                                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                                    >
                                                                        <span aria-hidden
                                                                            className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                                                                        <span className="relative"
                                                                        >Active</span>
                                                                    </span>
                                                            }
                                                        </td>
                                                    }
                                                </tr>
                                            ))
                                        }
                                        {!paginatedFixtures.length && <tr className="flex justify-center ">
                                            <td className="px-5 py-5 text-center border-b border-gray-200  text-sm w-">
                                                <div className="flex items-center">

                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            No fixtures found
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>}
                                    </tbody>}

                            </table>
                            <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

                                <div className="inline-flex mt-2 xs:mt-0">
                                    <TablePagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={filteredFixtures.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {status === 'pending' && <Loader />}
        </>
    );
};

export default AllFixturesTable;
