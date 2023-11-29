import { useQuery } from "@tanstack/react-query";
import { allFollowedClubs } from "../../../api/user";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Club {
    _id: string,
    name: string;
    image: string;
}

const FollowingClubs = () => {

    const { isLoading, data: clubData } = useQuery({ queryKey: ["followedClubs"], queryFn: allFollowedClubs });

    let clubs: Club[] = [];
    if (clubData && clubData.data) {
        clubs = clubData.data;
    }

    return (
        <div className="bg-white rounded shadow w-full pt-8 px-7 pb-10">
            <h1 className="text-2xl font-semibold text-center text-gray-800">All Clubs</h1>
            {isLoading
                ?
                <div className="mt-5">
                    <div className="w-full py-2 px-5 border sm:flex items-center justify-between">
                        <div className="flex gap-4 items-center sm:justify-start justify-center">
                            <Skeleton circle={true} height={50} width={50} /> {/* Skeleton for the image */}
                            <Skeleton width={150} height={20} /> {/* Skeleton for the club name */}
                        </div>
                        <div className="mt-3 text-center">
                            <Skeleton width={100} height={40} /> {/* Skeleton for the 'View Club' button */}
                        </div>
                    </div>
                </div>
                :
                <>
                    {clubs.map((club: Club) => (
                        <div className="mt-5" key={club._id}>
                            <div className="w-full py-2 px-5 border rounded  sm:flex items-center justify-between shadow-sm">
                                <div className="flex gap-4 items-center sm:justify-start justify-center">
                                    <img src={club.image} alt="" className="h-12 w-auto" />
                                    <h1 className="text-gray-800 text-2xl  font-semibold tracking-wider">{club.name}</h1>
                                </div>
                                <div className="my-5 sm:my-0 text-center">
                                    <Link to={`/clubDetails?id=${club._id}`} className="px-4 py-2  text-white bg-blue-600 hover:bg-blue-700 rounded">View Club</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </>}
        </div>
    );
};

export default FollowingClubs;
