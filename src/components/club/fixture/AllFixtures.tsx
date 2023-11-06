import React from "react";
import CommonHeader from "../headers/CommonHeader";
import FixtureCards from "./FixtureCards";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelFixture, getClubFixtures } from "../../../api/fixture";
import LoadingScreen from "../../common/LoadingScreen";
import toast from "react-hot-toast";

interface Fixture {
  _id: string,
  title: string,
  awayTeamLogo: string,
  awayTeam: string;
  time: string,
  date: string;
}

const AllFixtures = () => {

  const { isLoading, data: clubFixtures, refetch } = useQuery({ queryKey: ['clubFixtures'], queryFn: getClubFixtures });
  { !isLoading && console.log(clubFixtures?.data); }


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

  return (
    <div>
      <CommonHeader />
      <div className="p-4 md:p-14">
        {isLoading || status == "pending" && <LoadingScreen size={35} />}
        {!isLoading && clubFixtures?.data && clubFixtures.data.length > 0 ?
          <>
            {
              clubFixtures.data.map((fixture: Fixture) => (
                <FixtureCards
                  key={fixture._id}
                  title={fixture.title}
                  awayLogo={fixture.awayTeamLogo}
                  awayTeamName={fixture.awayTeam}
                  time={fixture.time}
                  date={fixture.date}
                  id={fixture._id}
                  cancelFn={cancelHandler}
                />
              ))
            }
          </> :
          <div className="text-center">
            <h1>No upcoming matches have been scheduled!</h1>
          </div>
        }
      </div>
    </div>
  );
};

export default AllFixtures;
