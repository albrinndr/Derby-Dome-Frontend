import React from "react";

interface FixtureDetailsHead {
    home: string;
    away: string;
}

const FixtureDetailsHead: React.FC<FixtureDetailsHead> = ({ home, away }) => {
    return (
        <div className="sm:py-10 pt-10 pb-10">
            {home && away && <div>
                <h1 className="text-3xl tracking-wide sm:text-6xl pb-2 sm:pb-4 text-gray-100 font-semibold text-center sm:text-start " >{home} vs {away}</h1>
            </div>}
        </div>
    );
};

export default FixtureDetailsHead;
