import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { cancelTicket } from "../../../api/user";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
// import ConfirmationModal from "../../common/ConfirmationModal";
import Loader from "../../common/Loader";
import CancelConfirmation from "../../club/fixture/CancelConfirm";

interface TicketI {
    _id: string;
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
    isCancelled: boolean;
}

interface FixtureDetails {
    _id: string;
    date: string;
    time: string;
    clubId: { name: string; };
    awayTeam: string;
}

interface Ticket {
    ticket: TicketI;
    fixtureDetails?: FixtureDetails;
    refetchFn: () => void;
    uRefetchFn: () => void;
}

interface ModalState {
    modal: {
        showModal: boolean;
    };
}

const SingleTicket: React.FC<Ticket> = ({ ticket, fixtureDetails, refetchFn, uRefetchFn }) => {
    const [showTicket, setShowTicket] = useState(true);
    //convert data
    const dateString = fixtureDetails?.date as string;
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthAndDay = date.toLocaleDateString('en-US', {
        month: 'long', // or 'long' for full month name
        day: 'numeric',
    });
    const year = date.getUTCFullYear();


    //convert time
    const originalTime: string = fixtureDetails?.time as string;
    const [hours, minutes] = originalTime.split(":");
    const formattedTime = new Date(0, 0, 0, parseInt(hours, 10), parseInt(minutes, 10)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    //seat converting
    const userSeats = ticket.seats;
    const formattedArray = userSeats.flatMap(({ row, userSeats }) =>
        userSeats.map(seat => `${row}${seat}`)
    );
    const formattedSeats = formattedArray.join(', ');

    //validating the dates for 3 days before the match for cancellation
    const currentDate = new Date();
    const currentDateMilliseconds = currentDate.getTime();
    const fixtureDate = fixtureDetails?.date ? new Date(fixtureDetails.date) : new Date();

    const fixtureDateMilliseconds = fixtureDate.getTime();
    const millisecondsInThreeDays = 3 * 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = fixtureDateMilliseconds - currentDateMilliseconds;

    //fixture cancellation handling
    const { status, mutate: cancelTicketMutate } = useMutation({
        mutationFn: cancelTicket,
        onSuccess: ((res) => {
            if (res && res.data) {
                setShowTicket(false)
                refetchFn();
                uRefetchFn();
                toast.success('Ticket cancelled!');
            }
        })
    });

    const { showModal } = useSelector((state: ModalState) => state.modal);
    const dispatch = useDispatch();

    const cancelBtnHandler = () => {
        dispatch(openModal());
    };


    return showTicket && (
        <div className="w-full  shadow border  mt-10">
            {/* details section */}
            {differenceInMilliseconds >= millisecondsInThreeDays && <div className="flex justify-end border-b p-2">
                <button className="bg-red-600 bg-opacity-80 hover:bg-opacity-95 sm:px-4 sm:py-2 px-3 py-1 rounded text-white" onClick={cancelBtnHandler}>Cancel</button>
            </div>}
            <div className="md:flex justify-between gap-5">
                <div className=" flex-1 border-b sm:border-r sm:border-b-0 border-dotted border-gray-400">
                    <div className="p-5">
                        <div className="border-t border-b py-2">
                            <div className="flex flex-col sm:flex-row items-center  justify-between">
                                <h1 className=" font-bold text-gray-700 uppercase">{day}</h1>
                                <h1 className="font-bold text-lg text-rose-700 uppercase">{monthAndDay}</h1>
                                <h1 className=" font-bold text-gray-700 uppercase">{year}</h1>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <h1 className="text-xl flex-wrap  sm:text-2xl font-bold text-center uppercase">{fixtureDetails?.clubId.name}</h1>
                            <h1 className=" font-semibold text-center">vs</h1>
                            <h1 className="text-xl flex-wrap  sm:text-2xl font-bold text-center uppercase">{fixtureDetails?.awayTeam}</h1>
                        </div>
                        <div className="mt-5 flex flex-col items-center">
                            <div className="flex gap-4">
                                <p className="font-semibold text-gray-700">Time: {formattedTime}</p>
                                <p className="font-semibold text-gray-700">Stand: {ticket.stand}</p>
                            </div>

                            <div className="mt-1">
                                <h1>Seats: ({formattedSeats})</h1>
                                <h1 className="text-lg font-semibold text-center mt-1">₹{ticket.price}</h1>
                            </div>
                        </div>
                        <div className="mt-4 border-t">
                            <h1 className="text-center pt-2"> Venue: Derby Dome Stadium</h1>
                        </div>
                    </div>
                </div>

                {/* qrSection */}
                <div className="p-5 sm:w-1/4 flex flex-col justify-center gap-2">
                    <div>
                        <h1 className="text-gray-600 text-sm text-center">{monthAndDay} {year}</h1>
                        <h1 className="text-gray-600 text-sm text-center">{formattedTime}</h1>
                    </div>
                    <div className="flex justify-center">
                        <img src={ticket.qrCode} alt="QR code"
                            className="w-28 sm:w-52" />
                    </div>
                </div>
            </div>
            {showModal && <CancelConfirmation confirmFn={cancelTicketMutate} id={ticket._id} />}
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default SingleTicket;