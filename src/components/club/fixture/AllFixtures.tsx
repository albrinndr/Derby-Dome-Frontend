import React, { useState } from "react";
import CommonHeader from "../headers/CommonHeader";
import FixtureCards from "./FixtureCards";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelFixture, getClubFixtures } from "../../../api/fixture";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import FixturePagination from "../../user/fixture/FixturePagination";

interface Fixture {
  _id: string,
  title: string,
  awayTeamLogo: string,
  awayTeam: string;
  time: string,
  date: string;
  createdAt: Date;
  checkDate: Date;
}

const AllFixtures = () => {
  const [sortBy, setSortBy] = useState("");
  const { isLoading, data: clubFixtures, refetch } = useQuery({ queryKey: ['clubFixtures'], queryFn: getClubFixtures });


  const { status, mutate } = useMutation({
    mutationFn: cancelFixture,
    onSuccess: (res) => {
      if (res && res.data) {
        toast.success(res.data);
        refetch();
      } else {
        toast.error('An error occurred!');
      }
    }
  });

  const cancelHandler = (id: string) => {
    mutate(id);
  };

  let fixtures: Fixture[] = [];
  if (clubFixtures && clubFixtures.data && clubFixtures.data.length > 0) {
    if (sortBy === "game") {
      fixtures = clubFixtures.data.sort((a: Fixture, b: Fixture) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      fixtures = clubFixtures.data.sort((a: Fixture, b: Fixture) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }
  //pag
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastFixture = currentPage * itemsPerPage;
  const indexOfFirstFixture = indexOfLastFixture - itemsPerPage;
  const currentFixtures = fixtures.slice(indexOfFirstFixture, indexOfLastFixture);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <CommonHeader />
      <div className="p-4 md:p-14">
        {isLoading || status == "pending" && <Loader />}
        {!isLoading && currentFixtures.length > 0 ?
          <>
            <div className="flex justify-end items-center mb-5 lg:mx-32 mt-5 lg:mt-0 ">
              <label htmlFor="filterFixture">Sort by: </label>
              <select id="filterFixture" value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-44 sm:w-48 text-center  p-2 ml-2 focus:outline-none border shadow rounded-lg">
                <option value="">Created Date</option>
                <option value="game">Game Date</option>
              </select>
            </div>
            <>
              {
                currentFixtures.map((fixture: Fixture) => (
                  <FixtureCards
                    key={fixture._id}
                    title={fixture.title}
                    awayLogo={fixture.awayTeamLogo}
                    awayTeamName={fixture.awayTeam}
                    time={fixture.time}
                    date={fixture.date}
                    id={fixture._id}
                    createdAt={fixture.createdAt}
                    cancelFn={cancelHandler}
                    checkDate={fixture.checkDate}
                  />
                ))
              }
            </>
          </> :
          <div className="text-center">
            <h1>No upcoming matches have been scheduled!</h1>
          </div>
        }
        {!isLoading && fixtures.length > itemsPerPage &&
          <div className="mt-5">
            <FixturePagination
              itemsPerPage={itemsPerPage}
              totalItems={fixtures.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        }
      </div>
    </div>
  );
};

export default AllFixtures;
