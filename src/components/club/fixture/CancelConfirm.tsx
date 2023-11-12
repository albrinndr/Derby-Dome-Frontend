import React from "react";
import ReactDOM from 'react-dom';
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/slices/modalSlice";


interface ModalContent {
    confirmFn: (id: string) => void,
    id: string,
    message?: string;
}


const Backdrop = () => {
    return <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-black bg-opacity-10  flex items-center justify-center" />;
};

const CancelConfirmation: React.FC<ModalContent> = ({ confirmFn, id, message }) => {
    const confirmationMessage = message ? message : "Are you sure want to continue?";

    const dispatch = useDispatch();

    const closeHandler = () => {
        dispatch(closeModal());
    };

    const submitHandler = () => {
        dispatch(closeModal());
        confirmFn(id);
    };

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root') as HTMLElement
            )}
            {ReactDOM.createPortal(
                <div className="fixed inset-0 flex  items-center justify-center z-50">
                    <div className="bg-white rounded-lg px-8 py-4 w-80">
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold">Confirmation</h2>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">{confirmationMessage}</p>
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={closeHandler}>
                                Cancel
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={submitHandler}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>

                , document.getElementById('modal-root') as HTMLElement
            )}
        </>
    );
};

export default CancelConfirmation;
