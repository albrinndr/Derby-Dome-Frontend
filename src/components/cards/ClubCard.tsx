import React from "react";
import { Link } from "react-router-dom";
// import Logo from '../../assets/kerala-logo.svg';
interface Card {
    logo: string;
    id: string;
    team: string;
    bgImg: string;
}

const ClubCard: React.FC<Card> = ({ logo, team, bgImg,id }) => {
    return (
        <Link to={`/clubDetails?id=${id}`}>
            <div className="w-full sm:w-auto md:w-full lg:w-full shadow-xl hover:shadow-2xl rounded-lg transition-all duration-300 transform hover:scale-105 mb-10">

                <div className="relative">
                    <img
                        src={bgImg}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="flex items-center sm:gap-4 absolute -bottom-7 bg-white px-3 py-1 rounded left-5 right-5 shadow justify-center gap-5">
                        <div className=" rounded-full">
                            <img src={logo} width={45} alt="Club Logo" className="sm:p-2 p-1" />
                        </div>
                        <div>
                            <h2 className="text-xs sm:text-lg md:text-xl lg:text-xl font-bold tracking-wider text-blue-900 mb-2 text-center uppercase">{team}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ClubCard;