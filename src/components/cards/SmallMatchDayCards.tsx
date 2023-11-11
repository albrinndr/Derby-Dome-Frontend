import React from "react";
import CalendarImage from '../../assets/calendar.svg';

interface Card {
    image?: string;
    _id: string;
    date: string;
    time: string;
    homeTeam: string;
    awayTeam: string;
}

const SmallMatchDayCards: React.FC<Card> = ({ image, homeTeam, awayTeam, date, time }) => {

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
        <div className="w-full sm:w-auto md:w-full lg:w-full shadow hover:shadow-lg  rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
            
        >
            <img
                src={image}
                alt="Football Match Poster"
                className="w-full h-28 sm:h-40 object-cover"
            />

            <div className=" bg-white pb-4">
                <div className="p-4 px-7">
                    <h2 className="text-xl sm:text-lg md:text-xl lg:text-xl font-semibold  mb-2 text-center" style={{ minHeight: '3.5rem' }}>{homeTeam} v {awayTeam}</h2>
                    <div className="flex mt-3">
                        <div>
                            <img src={CalendarImage} alt="" className="w-5 mr-3" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-xs md:text-sm lg:text-sm text-gray-600">{formattedDate}  |  {formattedTime}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallMatchDayCards;