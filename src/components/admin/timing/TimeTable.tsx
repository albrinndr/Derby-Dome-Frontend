import React, { useState } from "react";
import PriceEditModal from "./ConfirmationModal";
import { useMutation } from "@tanstack/react-query";
import { deleteMatchTime, updateMatchTimePrice } from "../../../api/stadium";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import ConfirmationModal from "../../common/ConfirmationModal";

interface Time {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    times: any[];
    refetchFn: () => void;
}
interface ModalState {
    modal: {
        showModal: boolean;
    };
}

const TimeTable: React.FC<Time> = ({ times, refetchFn }) => {
    const [timeId, setTimeId] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(0);

    const { mutate } = useMutation({
        mutationFn: updateMatchTimePrice,
        onSuccess: () => {
            refetchFn();
            toast.success('Price updated');
        }
    });

    const { mutate: deleteTime } = useMutation({
        mutationFn: deleteMatchTime,
        onSuccess: () => {
            refetchFn();
            toast.success('Price updated');
        }
    });

    const updateHandler = (price: number) => {
        setShowEdit(false);
        mutate({ id: timeId, price });
    };

    const editHandler = (id: string, price: number) => {
        setShowEdit(true);
        setTimeId(id);
        setCurrentPrice(price);
    };

    const cancelModel = () => {
        setShowEdit(false);
    };

    const matchTimeDelete = (id: string) => {
        deleteTime(id);
    };

    const { showModal } = useSelector((state: ModalState) => state.modal);
    const dispatch = useDispatch();

    const modalHandler = (id: string) => {
        setTimeId(id);
        dispatch(openModal());
    };

    return (
        <div className="flex justify-center">
            <div className="lg:col-span-2 p-1 border-2 overflow-y-auto w-full max-h-64 max-w-4xl p- mt-10">
                {times.filter((time) => !time.delete).map((time) => (
                    <div key={time._id} className="w-full border mt-1 mb-1 bg-slate-200 flex flex-col sm:flex-row justify-between p-4 py-6 rounded-sm">
                        <div className="flex justify-between gap-5 sm:w-1/3">
                            <h1>{time.time}</h1>
                            <h1>₹{time.price}</h1>
                        </div>
                        <div className="flex justify-center mt-2 sm:mt-0 sm:justify-between gap-5 sm:w-1/3">
                            <button className="p-2 bg-green-600 text-white hover:bg-green-700 text-md rounded px-6" onClick={() => editHandler(time._id, time.price)}>Edit</button>
                            <button className="p-2 bg-red-500 text-white hover:bg-red-600 text-md rounded" onClick={() => modalHandler(time._id)}>Delete</button>
                        </div>
                    </div>
                ))}
                {
                    times.map.length == 0 && <div className="w-full border mt-1 mb-1 bg-slate-200 flex flex-col sm:flex-row justify-between p-4 py-6 rounded-sm">
                        <div className="flex justify-between gap-5 sm:w-1/3">
                            <h1>No data available</h1>
                        </div>
                    </div>
                }
            </div>
            {showEdit && <PriceEditModal updateFn={updateHandler} cancelFn={cancelModel} currPrice={currentPrice} />}
            {showModal && <ConfirmationModal confirmFn={matchTimeDelete} id={timeId} />}

        </div>
    );
};

export default TimeTable;
