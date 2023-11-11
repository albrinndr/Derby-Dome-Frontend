import React from "react";
import styles from './FixtureCards.module.css';

interface Fixture {
    clubId: {
        name: string,
        image: string;
    };
    awayTeam: string;
    awayTeamLogo: string,
    createdAt: string;
    date: string;
    time: string,
    title: string;
}
interface FixtureData {
    fixture: Fixture;
}

const FixtureCards: React.FC<FixtureData> = ({ fixture }) => {
    const dateString = fixture.date;
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthAndDay = date.toLocaleDateString('en-US', {
        month: 'short', // or 'long' for full month name
        day: 'numeric',
    });
    const year = date.getUTCFullYear();

    const originalTime: string = fixture.time;
    const [hours, minutes] = originalTime.split(":");
    const formattedTime = new Date(0, 0, 0, parseInt(hours, 10), parseInt(minutes, 10)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <div className="bg-white rounded-lg border border-gray-200  hover:shadow mt-10" >
            <div className="p-4 lg:flex lg:justify-between lg:gap-2">
                <div className="lg:flex gap-20">
                    <div className="flex lg:flex-col gap-2 lg:gap-0 justify-center text-center w-full lg:w-28 lg:py-1 py-3 px-2 bg-green-100  rounded-md leading-5">
                        <small className="text-gray-500 font-semibold ">{day}</small>
                        <h1 className="font-bold text-gray-800 ">{monthAndDay}</h1>
                        <small className="text-gray-500 font-semibold ">{year}</small>
                    </div>

                    <div className="flex justify-center  mt-5 lg:mt-0 items-center lg:ml-5 gap-3">
                        <div className="">
                            <img src={fixture.clubId.image} width={30} alt="" />
                            <p></p>
                        </div>

                        <div className="font-bold lg:flex lg:gap-3 text-center tracking-widest lg:tracking-wider text-gray-700 w-fit">
                            <h1 className="uppercase">{fixture.clubId.name}</h1>
                            <h1 className="text-red-600">vs</h1>
                            <h1 className="uppercase">{fixture.awayTeam}</h1>
                        </div>
                        <div className="">
                            <img src={fixture.awayTeamLogo} width={30} alt="" />
                        </div>
                    </div>
                </div>

                <div className="lg:flex gap-20">
                    <div className="text-center font-semibold mt-5 lg:mt-0  text-gray-800">
                        <h1>{fixture.title}</h1>
                        <h1>Derby Dome football stadium, India</h1>
                        <h1>{formattedTime}</h1>
                    </div>
                    <div className="flex items-center mt-5 lg:mt-0 justify-center">
                        <button className={styles.button_48}><span>BOOK NOW</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FixtureCards;
