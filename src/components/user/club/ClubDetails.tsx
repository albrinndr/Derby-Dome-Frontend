import React, { useEffect, useState } from "react";
import FixtureCards from "../fixture/FixtureCards";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { followClub } from "../../../api/user";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";

interface Club {
  _id: string;
  name: string;
  image: string;
  description: string;
  followers: string[];
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
interface User {
  id: string;
}

const ClubDetails: React.FC<ClubDetails> = ({ clubData }) => {
  const userData = localStorage.getItem('uLoggedIn');
  const user: User = userData ? JSON.parse(userData) : false;
  const followers = clubData.club.followers;

  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (user && followers.includes(user.id)) setFollowing(true);
  }, [user, followers]);

  const navigate = useNavigate();

  const { status, mutate: followMutate } = useMutation({
    mutationFn: followClub,
    onSuccess: ((res) => {
      if (res && res.data) {
        toast.success(res.data);
        if (following) {
          setFollowing(false);
        } else {
          setFollowing(true);
        }
      }
    })
  });

  const followHandler = () => {
    if (!user) {
      return navigate('/login');
    }
    followMutate(clubData.club._id);
  };


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
              <button className="bg-[#E74A4B] p-1 rounded hover:bg-[#db2a2b] text-white text-sm px-2 mt-3 sm:text-md"
                onClick={followHandler}>
                {following ? (
                  <>
                    Following ✓
                  </>
                ) : (
                  <>
                    Follow +
                  </>
                )}
              </button>
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
      {status === 'pending' && <Loader />}
    </div >

  );
};

export default ClubDetails;
