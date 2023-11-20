import React, { useState } from "react";
import styles from '../fixture/FixtureCards.module.css';
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../../../api/user";
import { useNavigate } from "react-router-dom";

interface VipBooking {
    seatData: {
        A: {
            count: number;
            seats: number[];
        };
        B: {
            count: number;
            seats: number[];
        };
    };
    id: string;
    stand: string;
    section: string;
    cartSeats: {
        A: number[];
        B: number[];
    };
}

const VipBooking: React.FC<VipBooking> = ({ seatData, id, stand, section, cartSeats }) => {
    const rowA = Array.from({ length: seatData.A.count }, (_, index) => index + 1);
    const rowB = Array.from({ length: seatData.B.count }, (_, index) => index + 1);

    const rowASeats = seatData.A.seats;
    const rowBSeats = seatData.B.seats;

    const [selectedSeatsA, setSelectedSeatsA] = useState<number[]>([]);
    const [selectedSeatsB, setSelectedSeatsB] = useState<number[]>([]);

    const navigate = useNavigate();

    const handleSeatClickA = (seat: number) => {
        if (selectedSeatsA.length + selectedSeatsB.length >= 10) {
            toast.error('Only 10 seats can be selected!');
            return;
        }
        if (selectedSeatsA.includes(seat)) {
            setSelectedSeatsA(selectedSeatsA.filter((s) => s !== seat));
        } else {
            setSelectedSeatsA([...selectedSeatsA, seat]);
        }
    };

    const handleSeatClickB = (seat: number) => {
        if (selectedSeatsA.length + selectedSeatsB.length >= 10) {
            toast.error('Only 10 seats can be selected!');
            return;
        }
        if (selectedSeatsB.includes(seat)) {
            setSelectedSeatsB(selectedSeatsB.filter((s) => s !== seat));
        } else {
            setSelectedSeatsB([...selectedSeatsB, seat]);
        }
    };


    const { mutate: bookingMutate } = useMutation({
        mutationFn: addToCart,
        onSuccess: ((res) => {
            if (res) {
                navigate('/checkout');
            } else {
                toast.error('An error occurred!');
            }
        })
    });

    const submitHandler = () => {
        if (!selectedSeatsA.length && !selectedSeatsB.length) {
            toast.error('Pick some seats');
            return;
        }
        const seats = [];
        if (selectedSeatsA.length) {
            const data = {
                row: 'A',
                userSeats: selectedSeatsA
            };
            seats.push(data);
        }
        if (selectedSeatsB.length) {
            const data = {
                row: 'B',
                userSeats: selectedSeatsB
            };
            seats.push(data);
        }
        const data = {
            fixtureId: id,
            stand,
            section,
            ticketCount: selectedSeatsA.length + selectedSeatsB.length,
            seats: seats,
            type: 'vip'
        };
        bookingMutate(data);

    };


    return (
        <div className="bg-white border rounded-lg p-5">
            <div>
                <h1 className="text-2xl text-center">Choose your favorite spot</h1>
            </div>
            <div className="mt-5">
                <div>
                    <h1 className="text-xl tracking-wider mb-3">Row A</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    {
                        rowA.map((seat, index) => (
                            <div key={index}
                                className={`flex items-center justify-center md:w-10 md:h-10 w-8 h-8 bg-gray-300 rounded-lg cursor-pointer ${selectedSeatsA.includes(index + 1) ? 'bg-green-500 text-white' : ''
                                    }`}
                                onClick={() => {
                                    if (!rowASeats.includes(index + 1) && !cartSeats.A.includes(index + 1)) {
                                        handleSeatClickA(index + 1);
                                    }
                                }}
                                style={{ opacity: rowASeats.includes(index + 1) || cartSeats.A.includes(index + 1) ? 0.5 : 1, pointerEvents: rowASeats.includes(index + 1) || cartSeats.A.includes(index + 1) ? 'none' : 'auto' }}
                            >
                                {index + 1}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8">
                <div>
                    <h1 className="text-xl tracking-wider mb-3">Row B</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    {
                        rowB.map((seat, index) => (
                            <div key={index}
                                className={`flex items-center justify-center md:w-10 md:h-10  w-8 h-8  bg-gray-300 rounded-lg cursor-pointer ${selectedSeatsB.includes(index + 1) ? 'bg-green-500 text-white' : ''
                                    }`}
                                onClick={() => {
                                    if (!rowBSeats.includes(index + 1) && !cartSeats.B.includes(index + 1)) {
                                        handleSeatClickB(index + 1);
                                    }
                                }}
                                style={{ opacity: rowBSeats.includes(index + 1) || cartSeats.B.includes(index + 1) ? 0.5 : 1, pointerEvents: rowBSeats.includes(index + 1) || cartSeats.B.includes(index + 1) ? 'none' : 'auto' }}
                            >
                                {index + 1}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-end mt-10 ">
                <button className={`${styles.button_48}`} onClick={submitHandler}><span>CONFIRM</span></button>
            </div>

        </div>
    );
};

export default VipBooking;
