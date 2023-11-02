import React from "react";

interface Time {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    times: any[];
}

const TimeTable: React.FC<Time> = ({ times }) => {
    return (
        <div className="flex justify-center">
            <div className="lg:col-span-2 p-1 border-2 overflow-y-auto w-full max-h-64 max-w-4xl p- mt-10">
                {times.map((time) => (
                    <div key={time._id} className="w-full border mt-1 mb-1 bg-slate-200 flex flex-col sm:flex-row justify-between p-4 py-6 rounded-sm">
                        <div className="flex justify-between gap-5 sm:w-1/3">
                            <h1>{time.time}</h1>
                            <h1>₹{time.newPrice}</h1>
                        </div>
                        <div className="flex justify-center mt-2 sm:mt-0 sm:justify-between gap-5 sm:w-1/3">
                            <button className="p-2 bg-green-600 text-white hover:bg-green-700 text-md rounded px-6">Edit</button>
                            <button className="p-2 bg-red-500 text-white hover:bg-red-600 text-md rounded">Delete</button>
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
        </div>
    );
};

export default TimeTable;
