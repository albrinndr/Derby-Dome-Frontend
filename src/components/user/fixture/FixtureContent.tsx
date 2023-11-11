import React, { useState } from "react";
import FixtureFilter from "./FixtureFilter";
import FixtureCards from "./FixtureCards";
import FixturePagination from "./FixturePagination";
import { useQuery } from "@tanstack/react-query";
import { getFixtures } from "../../../api/user";
import FixtureCardsSkeleton from "./FixtureSkeleton";

interface Club {
    name: string;
    _id: string;
}

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
    _id: string;
    checkDate: string;
}

const FixtureContent = () => {
    const [team, setTeam] = useState('');
    const [date, setDate] = useState('');

    const teamHandler = (val: string) => {
        setTeam(val);
    };
    const dateHandler = (val: string) => {
        setDate(val);
    };

    const { isLoading, data: fixtureData } = useQuery({ queryKey: ['allFixtures'], queryFn: getFixtures });

    let allTeams = [];
    if (fixtureData?.data.clubs.length) {
        allTeams = fixtureData?.data.clubs.map((club: Club) => [club.name, club._id]);
    }

    let allFixtures = fixtureData?.data.fixtures;
    if (allFixtures)
        allFixtures = allFixtures.filter((fixture: Fixture) => {
            const today = new Date();
            const checkDate = new Date(fixture.checkDate);

            // Convert both dates to the same time zone (UTC) for accurate comparison
            today.setHours(0, 0, 0, 0);
            checkDate.setHours(0, 0, 0, 0);
            return today > checkDate;
        });

    //filter date changing
    const filterDate = new Date(date);
    const changedDate = new Date(filterDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000); // Adding 5 hours and 30 minutes

    let fixtures = [];
    if (allFixtures) fixtures = [...allFixtures];


    if (team && date && allFixtures) {
        fixtures = allFixtures.filter((fixture: Fixture) => fixture.clubId.name === team && new Date(fixture.date).setHours(0, 0, 0, 0) === new Date(changedDate).setHours(0, 0, 0, 0));
    } else if (team && allFixtures) {
        fixtures = allFixtures.filter((fixture: Fixture) => fixture.clubId.name === team || fixture.awayTeam === team);
    } else if (date && allFixtures) {
        fixtures = allFixtures.filter((fixture: Fixture) => new Date(fixture.date).setHours(0, 0, 0, 0) === new Date(changedDate).setHours(0, 0, 0, 0));
    }


    //pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastFixture = currentPage * itemsPerPage;
    const indexOfFirstFixture = indexOfLastFixture - itemsPerPage;
    const currentFixtures = fixtures.slice(indexOfFirstFixture, indexOfLastFixture);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
                <FixtureFilter filterTeam={teamHandler} filterDate={dateHandler} teams={allTeams} />
            {!isLoading ? <>
                {fixtureData?.data.fixtures.length &&
                    <div>
                        {
                            allFixtures && fixtures &&
                            <>
                                {currentFixtures.map((fixture: Fixture) => (
                                    <FixtureCards fixture={fixture} key={fixture._id} />

                                ))}
                            </>
                        }
                    </div>
                }
                <div className="mt-5">
                    <FixturePagination
                        itemsPerPage={itemsPerPage}
                        totalItems={fixtures.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </> :
                <>
                <FixtureCardsSkeleton />
                <FixtureCardsSkeleton />
                <FixtureCardsSkeleton />
                </>
            }
        </div >
    );
};

export default FixtureContent;
