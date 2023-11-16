import React from "react";
import CalendarImage from '../../assets/calendar.svg';
import { Link } from "react-router-dom";

interface Card {
    image?: string;
    _id: string;
    date: string;
    time: string;
    homeTeam: string;
    awayTeam: string;
    price: number;
}

const MatchDayCard: React.FC<Card> = ({ image, homeTeam, awayTeam, date, time, price, _id }) => {

    const originalDate = new Date(date);
    const formattedDate = originalDate.toLocaleDateString("en-US", { month: "long", day: "numeric" });

    const originalTime: string = time;
    const [hours, minutes] = originalTime.split(":");
    const formattedTime = new Date(0, 0, 0, parseInt(hours, 10), parseInt(minutes, 10)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <Link to={`/fixtureDetails?id=${_id}`}>
            <div className="w-full sm:w-auto md:w-full shadow lg:w-full  rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
            >
                <img
                    src={image}
                    alt="Football Match Poster"
                    className="w-full h-52 sm:h-60 md:h-60 lg:h-60 object-cover"
                />
                <div className=" pb-4">
                    <div className="p-4 px-7">
                        <h2 className="text-xl sm:text-lg lg:text-xl font-semibold  mb-2 text-center" style={{ minHeight: '3.5rem' }}>{homeTeam} v {awayTeam}</h2>
                        <div className="flex mt-4">
                            <div>
                                <img src={CalendarImage} alt="" className="w-5 mr-3" />
                            </div>
                            <div>
                                <p className="text-sm sm:text-xs md:text-sm lg:text-sm text-gray-600">{formattedDate}  |  {formattedTime}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between bg-blue-50 ml-4 mr-4 p-2 pl-2 pr-2 rounded-md">
                        <div>
                            <p className="text-xs sm:text-sm md:text-sm lg:text-md ">₹{price} ONWARDS</p>
                        </div>
                        <div>
                            <span className="text-blue-500">|</span>
                            <button className="ml-3 text-xs sm:text-sm md:text-sm lg:text-md ">BUY NOW</button>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default MatchDayCard;