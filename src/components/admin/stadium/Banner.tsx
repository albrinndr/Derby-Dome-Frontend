import React from "react";
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const Banner = () => {
    const imageURL = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1698151130/userManagement/zu797ljiskrvdxbb54p7.png';
    return (
        <div className="p-4">
            <img src={imageURL} className="mb-5 rounded w-1/2" alt="" />

            <form action="" className="">
                <div>
                    <input
                        className="hidden"
                        id="image"
                        type="file"
                        accept="image/*"
                        multiple={false}
                    />
                    <label
                        htmlFor="image"
                        className="w-1/2 flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        <span className='text-gray-500 text-sm'>Upload Your Logo</span>
                    </label>
                </div>
                <div className="mt-4 ">
                    <div className="flex">
                        <span className="text-sm text-gray-500 mt-1"> <AiOutlineQuestionCircle /> </span>
                        <span className="text-sm text-gray-500 ml-1">Optional</span>
                    </div>
                    <input type="text" name="" id="" placeholder="Enter you banner text" className="border border-gray-400 rounded " />

                </div>
                <div>
                    <button className="bg-green-400 mt-5 hover:bg-green-500 rounded p-2 w-1/4">Save</button>
                </div>
            </form>
        </div>
    );
};

export default Banner;
