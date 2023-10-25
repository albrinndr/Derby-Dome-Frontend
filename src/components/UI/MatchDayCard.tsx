import React from "react";
import CalendarImage from '../../assets/calendar.svg';

const MatchDayCard = () => {
    return (
        <div className="w-full sm:w-auto md:w-full lg:w-full shadow-lg rounded-lg overflow-hidden">
            <img
                src="https://source.unsplash.com/random"
                alt="Football Match Poster"
                className="w-full h-52 sm:h-60 md:h-60 lg:h-60 object-cover"
            />
            <div className=" bg-slate-100 pb-4">
                <div className="p-4 px-7">
                    <h2 className="text-xl sm:text-lg md:text-xl lg:text-xl font-bold mb-2 text-center">Napoli SV v Barcelona</h2>
                    <div className="flex mt-4">
                        <div>
                            <img src={CalendarImage} alt="" className="w-5 mr-3" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-xs md:text-sm lg:text-sm text-gray-600">October 31  |  08:30 PM</p>
                        </div>

                    </div>
                </div>
                <div className="flex justify-between bg-sky-100 ml-4 mr-4 p-2 pl-2 pr-2 rounded-md">
                    <div>
                        <p className="text-xs sm:text-sm md:text-sm lg:text-md ">₹225 ONWARDS</p>
                    </div>
                    <div>
                        <span className="text-blue-500">|</span>
                        <button className="ml-3 text-xs sm:text-sm md:text-sm lg:text-md ">BUY NOW</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MatchDayCard;