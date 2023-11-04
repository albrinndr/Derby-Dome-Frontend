import React, { useState } from "react";
import ReactDOM from 'react-dom';
import toast from "react-hot-toast";


interface ModalContent {
    updateFn: (price: number) => void,
    cancelFn: () => void,
    currPrice: number;
}


const Backdrop = () => {
    return <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-black bg-opacity-60 flex items-center justify-center" />;
};

const PriceEditModal: React.FC<ModalContent> = ({ updateFn, cancelFn, currPrice }) => {
    const [price, setPrice] = useState(currPrice);
    const cancelModal = () => {
        cancelFn();
    };

    const updatePrice = () => {
        if (price === 0) {
            toast.error('Enter a valid price!');
            return;
        }
        updateFn(price);
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
                            <h2 className="text-2xl font-semibold">Edit Price </h2>
                            <hr />
                        </div>

                        <div className="mb-6">
                            <input type="number" className="border-gray-400 focus:outline-gray-300 rounded h-10 border"
                                value={price} min={0} onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={cancelModal}>
                                Cancel
                            </button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={updatePrice} >
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

export default PriceEditModal;
