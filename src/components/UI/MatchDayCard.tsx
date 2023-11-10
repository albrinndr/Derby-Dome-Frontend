import React from "react";
import CalendarImage from '../../assets/calendar.svg';

interface Card {
    image?: string;
    _id: string;
    // title: string;
    date: string;
    time: string;
    homeTeam: string;
    awayTeam: string;
    price: number;
}

const MatchDayCard: React.FC<Card> = ({ image, homeTeam, awayTeam, date, time, price }) => {

    // const cardBg = {
    //     backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${image})`,
    // };
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
        <div className="w-full sm:w-auto md:w-full lg:w-full  rounded-lg overflow-hidden"
            style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}
        >
            <img
                src={image}
                alt="Football Match Poster"
                className="w-full h-52 sm:h-60 md:h-60 lg:h-60 object-cover"
            />
            {/* <div className="flex justify-between py-10 px-2" style={cardBg}>
                <div className="h-20 sm:h-32 flex items-center">
                    <img src={homeTeamLogo} className="object-contain" width={100} height={100} alt="" />
                </div>
                <div className="h-20 sm:h-32 flex items-center">
                    <img src={awayTeamLogo} className="object-contain" width={100} height={100} alt="" />
                </div>
            </div> */}

            <div className=" bg-slate-100 pb-4">
                <div className="p-4 px-7">
                    <h2 className="text-xl sm:text-lg md:text-xl lg:text-xl font-semibold  mb-2 text-center" style={{ minHeight: '3.5rem' }}>{homeTeam} v {awayTeam}</h2>
                    <div className="flex mt-4">
                        <div>
                            <img src={CalendarImage} alt="" className="w-5 mr-3" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-xs md:text-sm lg:text-sm text-gray-600">{formattedDate}  |  {formattedTime}</p>
                        </div>

                    </div>
                </div>
                <div className="flex justify-between bg-sky-100 ml-4 mr-4 p-2 pl-2 pr-2 rounded-md">
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
    );
};

export default MatchDayCard;