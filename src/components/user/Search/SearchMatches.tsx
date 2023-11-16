import React from "react";
import SmallMatchDayCards from "../../cards/SmallMatchDayCards";

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

interface SearchMatches {
    fixtures: Fixture[];
}

const SearchMatches: React.FC<SearchMatches> = ({ fixtures }) => {
    return (
        <>
            {fixtures.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10  items-center">{
                    fixtures.map((fixture) => (
                        <SmallMatchDayCards
                            key={fixture._id}
                            image={fixture.poster}
                            homeTeam={fixture.clubId.name}
                            awayTeam={fixture.awayTeam}
                            time={fixture.time}
                            date={fixture.date}
                            _id={fixture._id}
                        />
                    ))
                }
                </div > :
                <div className="flex justify-center">
                    No contents available
                </div>
            }
        </>
    );
};

export default SearchMatches;
