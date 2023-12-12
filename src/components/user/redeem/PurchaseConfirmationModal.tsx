import React from 'react';

interface PurchaseI {
    closeFn: () => void;
    purchaseFn: () => void;
}

const PurchaseConfirmationModal: React.FC<PurchaseI> = ({ closeFn, purchaseFn }) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-3 sm:p-0">
            <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold">Confirm Purchase</h2>
                    <button onClick={closeFn} className="text-gray-500 hover:text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4">
                    Are you sure you want to make this purchase?
                </p>
                <div className="flex sm:flex-row flex-col-reverse justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
                        onClick={closeFn} >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        onClick={purchaseFn} >
                        Confirm Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseConfirmationModal;
