import React from "react";
import MatchDayCard from "../../UI/MatchDayCard";

interface MatchDay {
    fixtures: Fixture[];
    price: number;
}

interface Fixture {
    _id: string;
    title: string;
    date: string;
    time: string;
    poster: string;
    clubId: {
        name: string;
        image: string;
    };
    awayTeam: string;
    awayTeamLogo: string;
}

const MatchDayCards: React.FC<MatchDay> = ({ fixtures, price }) => {
    return (
        <div className="px-5 md:px-10 lg:px-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10  items-center">
                {
                    fixtures.map((fixture) => (
                        <MatchDayCard
                            key={fixture._id}
                            image={fixture.poster}
                            homeTeam={fixture.clubId.name}
                            awayTeam={fixture.awayTeam}
                            time={fixture.time}
                            date={fixture.date}
                            _id={fixture._id}
                            price={price}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default MatchDayCards;
