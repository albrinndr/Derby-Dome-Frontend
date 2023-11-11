import React from "react";
import ClubCard from "../../cards/ClubCard";

interface Club {
    name: string;
    image: string;
    _id: string;
    bgImg: string;
}
interface SearchClubs {
    clubs: Club[];
}

export const SearchClubs: React.FC<SearchClubs> = ({ clubs }) => {
    return (
        <>
            {clubs.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 p-10 items-center">
                    {
                        clubs.map((club: Club) => (
                            <ClubCard
                                id={club._id}
                                bgImg={club.bgImg}
                                team={club.name}
                                logo={club.image}
                                key={club._id}
                            />
                        ))
                    }
                </div> :
                <div className="flex justify-center">
                    No contents available
                </div>
            }
        </>

    );
};
