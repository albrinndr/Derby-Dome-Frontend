import React from "react";
import styles from '../FixtureCards.module.css';
import { Link } from "react-router-dom";

interface Fixture {
    clubId: {
        name: string,
        image: string;
        team: {
            players: [{
                name: string;
                image: string;
                _id: string;
                startingXI: boolean;
            }];
        };
    };
    awayTeamId?: {
        team: {
            players: [{
                name: string;
                image: string;
                _id: string;
                startingXI: boolean;
            }];
        };
    };
    awayTeam: string;
    awayTeamLogo: string,
    date: string;
    time: string,
    title: string;
    _id: string;
    poster: string;
}

interface Player {
    name: string;
    image: string;
    _id: string;
    startingXI: boolean;
}

interface FixtureDetails {
    fixture: Fixture;
}

const FixtureDetails: React.FC<FixtureDetails> = ({ fixture }) => {
    return fixture && (
        <div className=" p-2 lg:flex lg:flex-row-reverse justify-between gap-10">

            <div className="p-4 lg:w-1/3 bg-white rounded shadow h-fit">
                <div className=" ">
                    <img src={fixture.poster} alt=""
                        className="rounded"
                    />
                </div>
                <div className="mt-5 flex gap-2">
                    <div className="flex-col  justify-center shadow text-center h-fit w-28 py-3 items-center px-2 bg-green-100  rounded-md leading-5">
                        <small className="text-gray-500 font-semibold ">Monday</small>
                        <h1 className="font-bold text-gray-800 ">Nov 10</h1>
                        <small className="text-gray-500 font-semibold ">2023</small>
                    </div>
                    <div className="shadow-sm px-2 w-full py-2 text-start">
                        <h1 className=" text-sm sm:text-xl text-gray-700">{fixture.title}</h1>
                        <h1 className=" lg:mt-0 font-semibold sm:text-xl text-gray-700 mt-3">{fixture.clubId.name} vs {fixture.awayTeam}</h1>
                        <h2 className="text-gray-700 mt-2">Nov 12 2023 | 08:30 PM</h2>
                    </div>
                </div>
                <div className="mt-4">
                    <Link to={`/booking?id=${fixture._id}`}><button className={`${styles.button_48} w-full`}><span>BOOK NOW</span></button>
                    </Link>
                </div>
            </div>
            <div className="bg-white px-3 py-5 rounded shadow lg:w-2/3">
                <div className="p-3 sm:text-lg">
                    <h1 className="font-semibold mb-3 border-b text-xl text-center pb-3">Match Details</h1>
                    <p>Get ready for an exhilarating football match between {fixture.clubId.name} against {fixture.awayTeam} that promises to deliver excitement, skill, and intense competition. This clash between two powerhouse teams is set to be a spectacle for fans and football enthusiasts alike. Get your tickets right away!</p>

                </div>
                <div className="text-xl text-gray-800 border-b p-3">
                    <h1 >Possible Starting XI</h1>
                </div>

                {/* home team players */}
                <div className="mt-6 mb-5 bg-green-50 p-2">
                    <h1 className="text-xl sm:font-semibold">{fixture.clubId.name} - Home Team</h1>
                </div>
                <div className="flex justify-center  flex-wrap gap-3">
                    {
                        fixture.clubId.team.players.
                            filter((player: Player) => player.startingXI === true).
                            map((player: Player) => (
                                <div key={player._id} className="flex items-center border gap-2 w-52 px-2 py-1">
                                    <img src={player.image} alt="" width={50} />
                                    <h1 className="overflow-hidden">{player.name}</h1>
                                </div>
                            ))
                    }
                </div>

                {
                    fixture.awayTeamId && fixture.awayTeamId.team.players.length >= 11 &&
                    <>
                        <div className="mt-10 mb-5 bg-green-50 p-2">
                            <h1 className="text-xl sm:font-semibold">Bangalore FC</h1>
                        </div>

                        <div className="flex justify-center  flex-wrap gap-3">
                            {
                                fixture.awayTeamId.team.players.
                                    filter((player: Player) => player.startingXI === true).
                                    map((player: Player) => (
                                        <div key={player._id} className="flex items-center border gap-2 w-52 px-2 py-1">
                                            <img src={player.image} alt="" width={50} />
                                            <h1 className="overflow-hidden">{player.name}</h1>
                                        </div>
                                    ))
                            }
                        </div>
                    </>
                }

            </div>
        </div>

    );
};

export default FixtureDetails;
