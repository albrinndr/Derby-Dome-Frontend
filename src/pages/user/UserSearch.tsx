import React, { useState } from "react";
import NavBar from "../../components/user/NavBar";
import SearchSection from "../../components/user/Search/SearchSection";
import SearchMatches from "../../components/user/Search/SearchMatches";
import { useQuery } from "@tanstack/react-query";
import { userSearch } from "../../api/user";
import Loader from "../../components/user/Search/Loader";
import { SearchClubs } from "../../components/user/Search/SearchClubs";
import SearchPagination from "../../components/user/Search/SearchPagination";

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

interface Club {
    name: string;
    logo: string;
    _id: string;
}

const UserSearch = () => {
    const { isLoading, data: searchData } = useQuery({ queryKey: ['allFixtures'], queryFn: userSearch });
    const [type, setType] = useState('Fixtures');
    const [search, setSearch] = useState('');

    const searchHandler = (val: string) => {
        setSearch(val);
    };
    const typeHandler = (val: string) => {
        setType(val);
    };

    const fixtures = searchData?.data.fixtures;
    const clubs = searchData?.data.clubs;

    let filteredFixtures = [];

    if (fixtures) {
        filteredFixtures = fixtures.filter((fixture: Fixture) => {
            const homeClub = fixture.clubId.name.toLowerCase();
            const awayClub = fixture.awayTeam.toLowerCase();
            const searchValue = search.toLowerCase();
            return homeClub.includes(searchValue) || awayClub.includes(searchValue);
        });
    }

    let filteredClubs = [];

    if (clubs) {
        filteredClubs = clubs.filter((club: Club) => {
            const homeClub = club.name.toLowerCase();
            const searchValue = search.toLowerCase();
            return homeClub.includes(searchValue);
        });
    }


    //club pagination
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastClub = currentPage * itemsPerPage;
    const indexOfFirstClub = indexOfLastClub - itemsPerPage;
    const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);
    const currentFixtures = filteredFixtures.slice(indexOfFirstClub, indexOfLastClub);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div>
            <NavBar />
            <div className="p-4 md:p-14">
                <SearchSection searchFn={searchHandler} typeFn={typeHandler} />
                {isLoading ?
                    <Loader /> :
                    <>
                        {type === 'Fixtures' ?
                            <>
                                <SearchMatches fixtures={currentFixtures} />
                                <div className="mt-5">
                                    <SearchPagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={filteredFixtures.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </div>

                            </>
                            : <>
                                <SearchClubs clubs={currentClubs} />
                                <div className="mt-5">
                                    <SearchPagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={filteredClubs.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default UserSearch;
