// PlayerTableSkeleton.tsx

import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const PlayerTableSkeleton = () => {
    return (
        <div>
            <div className="flex justify-between">
                <button>
                    <Skeleton width={150} />
                </button>
                <button>
                    <Skeleton width={150} />
                </button>
            </div>
            <div className="py-8 xl:flex justify-between">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto text-center">
                    <h1 className="font-semibold mb-3">
                        <Skeleton width={150} />
                    </h1>
                    <div className="inline-block max-h-72   rounded-lg ">
                        <table className="bg-white shadow">
                            <thead>
                                <tr className="">
                                    <th
                                        className="px-3 py-3 border-b-2 pl-16 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={50} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={50} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={100} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={50} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Render multiple skeleton rows */}
                                {[1, 2, 3].map((index) => (
                                    <tr className="bg-white  border-b" key={index}>
                                        {/* Repeat skeleton cells for each column */}
                                        <td className="px-3 py-3   text-sm w-32">
                                            <Skeleton width={40} height={40} />
                                        </td>
                                        <td className="w-32 px-3  py-3  text-sm">
                                            <Skeleton width={30} />
                                        </td>
                                        <td className="w-32 px-3  py-3   text-sm">
                                            <Skeleton width={80} />
                                        </td>
                                        <td className="w-28 px-3  py-3  text-sm">
                                            <Skeleton width={60} />
                                        </td>
                                        <td className="w-28 px-3  py-3 gap-10 border-gray-200 text-xl flex items-center">
                                            <Skeleton width={30} height={30} />
                                            <Skeleton width={30} height={30} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto text-center">
                    <h1 className="font-semibold mb-3">
                        <Skeleton width={150} />
                    </h1>
                    <div className="inline-block max-h-72   rounded-lg ">
                        <table className="bg-white shadow">
                            <thead>
                                <tr className="">
                                    <th
                                        className="px-3 py-3 border-b-2 pl-16 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={50} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={50} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={100} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        <Skeleton width={50} />
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Render multiple skeleton rows */}
                                {[1, 2, 3].map((index) => (
                                    <tr className="bg-white  border-b" key={index}>
                                        {/* Repeat skeleton cells for each column */}
                                        <td className="px-3 py-3   text-sm w-32">
                                            <Skeleton width={40} height={40} />
                                        </td>
                                        <td className="w-32 px-3  py-3  text-sm">
                                            <Skeleton width={30} />
                                        </td>
                                        <td className="w-32 px-3  py-3   text-sm">
                                            <Skeleton width={80} />
                                        </td>
                                        <td className="w-28 px-3  py-3  text-sm">
                                            <Skeleton width={60} />
                                        </td>
                                        <td className="w-28 px-3  py-3 gap-10 border-gray-200 text-xl flex items-center">
                                            <Skeleton width={30} height={30} />
                                            <Skeleton width={30} height={30} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Repeat the same structure for the "POSSIBLE STARTING XI" section */}
            </div>
        </div>
    );
};

export default PlayerTableSkeleton;
