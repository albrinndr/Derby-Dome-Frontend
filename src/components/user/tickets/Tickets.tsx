import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../../api/user";
import SingleTicket from "./SingleTicket";
import Pagination from "../Pagination";
import { useState } from "react";

interface TicketI {
    userId: string;
    fixtureId: string;
    stand: string;
    price: number;
    qrCode: string;
    seats: [{
        row: string;
        userSeats: number[];
    }
    ];
}

interface FixtureI {
    _id: string;
    date: string;
    time: string;
    clubId: { name: string; };
    awayTeam: string;
}

const Tickets = () => {
    const { isLoading, data: ticketData } = useQuery({ queryKey: ['myTickets'], queryFn: getTickets });

    let tickets: [] = [];
    let ticketFixtures: [] = [];

    if (ticketData && ticketData.data) {
        tickets = ticketData?.data.tickets;
        ticketFixtures = ticketData?.data.ticketFixtures;
    }



    //pagination
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastFixture = currentPage * itemsPerPage;
    const indexOfFirstFixture = indexOfLastFixture - itemsPerPage;
    const currentFixtures = tickets.slice(indexOfFirstFixture, indexOfLastFixture);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className=" bg-white rounded shadow w-full pt-8 px-7 pb-10">
            <h1 className="text-2xl font-semibold text-center text-gray-800">Upcoming Matches Tickets</h1>

            {isLoading ? <div className="grid place-content-center mt-20">Loading...</div> :
                <div>
                    {
                        tickets && ticketFixtures ?
                            <div>
                                <div>
                                    {
                                        currentFixtures.map((ticket: TicketI, i) => {
                                            const fixtures = ticketFixtures.find((fixture: FixtureI) => fixture._id === ticket.fixtureId);
                                            return <SingleTicket key={i} fixtureDetails={fixtures} ticket={ticket} />;
                                        }
                                        )
                                    }
                                </div>
                                <div className="mt-5">
                                    <Pagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={tickets.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div> :
                            <div>
                                <h1 className="grid place-content-center mt-20">No tickets available</h1>
                            </div>
                    }
                </div>
            }
        </div>
    );
};

export default Tickets;
