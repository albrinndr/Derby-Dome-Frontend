import React from "react";
import { GrClose } from 'react-icons/gr';

interface Modal {
    modalFn: () => void;
}

const AddManager: React.FC<Modal> = ({ modalFn }) => {
    return (
        <>
            <div className="bg-black opacity-50 fixed z-0 top-0 left-0 right-0 bottom-0 "
            ></div>
            <div className="fixed  top-0 left-0 right-0 bottom-0 grid place-content-center z-10 ">
                <div className="bg-white rounded text-black ">
                    <div className="text-gray-700 flex justify-end mt-2 mr-4">
                        <div className="cursor-pointer" onClick={modalFn}>
                            <GrClose />
                        </div>
                    </div>
                    <div className="p-5 ">
                        <form >


                            <div>
                                <label htmlFor="">Manager Name:</label>
                                <br /><input type="text" className="border h-10 w-64 mt-2" />
                            </div>
                            <div className="mt-6">
                                <label className="bg-gray-400 px-2 py-1 rounded text-white">
                                    <input type="file" className="hidden" />Image..
                                </label>
                            </div>
                            <div className="mt-6">
                                <button className="bg-green-500 text-white px-2 py-1 w-full rounded-sm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AddManager;
