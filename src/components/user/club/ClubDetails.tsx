import React from "react";
import FixtureCards from "../fixture/FixtureCards";

interface Club {
  name: string;
  image: string;
  description: string;
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
}

interface ClubDetails {
  clubData: {
    club: Club;
    fixtures: Fixture[];
  };

}

const ClubDetails: React.FC<ClubDetails> = ({ clubData }) => {
  return (
    <div>
      <div className="shadow-lg bg-white rounded p-4">
        <div className="flex gap-10">
          <div className="">
            <img src={clubData.club.image} className="w-14 md:w-32" alt="" />
          </div>
          <div>
            <div className="sm:flex sm:gap-3 sm:items-center">
              <h1 className="font-semibold text-2xl sm:text-4xl text-gray-800 sm:tracking-wider">{clubData.club.name}</h1>
              <button className="bg-[#E74A4B] p-1 rounded hover:bg-[#db2a2b] text-white text-sm px-2 mt-3 sm:text-md">Follow + </button>
            </div>
            <p className="hidden md:block mt-7 mb-3">{clubData.club.description}
            </p>
          </div>
        </div>
        <div className="md:hidden mt-7 mb-3">
          <p>{clubData.club.description}
          </p>
        </div>
      </div>

      {clubData.fixtures.length > 0 && < div className="mt-10 shadow-lg border p-4 rounded-lg">
        <h1 className="text-xl border-b pb-2 font-semibold text-center">Upcoming matches</h1>
        <div className="mt-5">
          {
            clubData.fixtures.map((fixture: Fixture) => (
              <FixtureCards fixture={fixture} key={fixture._id} />
            ))
          }
        </div>
      </div>}
    </div >

  );
};

export default ClubDetails;
