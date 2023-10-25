import React from "react";
import MatchDayCard from "../UI/MatchDayCard";

const MatchDayCards = () => {
    return (
        <div className="px-5 md:px-10 lg:px-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10  items-center">
                <MatchDayCard />
                <MatchDayCard />
                <MatchDayCard />
            </div>
        </div>
    );
};

export default MatchDayCards;
