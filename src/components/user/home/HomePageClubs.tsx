import React from "react";
import { Link } from "react-router-dom";

interface HomePageClubs {
    clubs: {
        image: string;
        bgImg: string;
        _id: string;
    }[];
}

const HomePageClubs: React.FC<HomePageClubs> = ({ clubs }) => {

    return (
        <div className=" px-4 md:px-14 lg:px-28 mt-12 ">
            <div className="p-2 mb-4   sm:flex justify-between items-center">
                <h1 className="bg-white text-gray-700 text-2xl md:text-3xl  font-semibold tracking-wider">Find your favorite club </h1>
                <Link to="/search"><button className="text-blue-700">See more {'>>'}</button></Link>
            </div>
            <div className="flex flex-wrap gap-7 justify-center">
                <Link to={`/clubDetails?id=${clubs[0]._id}`}><div className="relative  w-64 md:w-72 overflow-hidden transition-all duration-300 transform hover:scale-105">
                    <img className="rounded h-44 object-cover" src={clubs[0].bgImg} alt="" />
                    <div className="absolute w-8  bottom-3 left-3">
                        <img src={clubs[0].image} alt="" />
                    </div>
                </div></Link>
                {clubs && clubs.length >= 2 && clubs[1] && (
                    <Link to={`/clubDetails?id=${clubs[1]._id}`}><div className="relative  w-64 md:w-72 overflow-hidden transition-all duration-300 transform hover:scale-105">
                        <img className="rounded h-44 object-cover" src={clubs[1].bgImg} alt="" />
                        <div className="absolute w-8  bottom-3 left-3">
                            <img src={clubs[1].image} alt="" />
                        </div>
                    </div></Link>
                )}

                {clubs && clubs.length >= 3 && clubs[2] && (
                    <Link to={`/clubDetails?id=${clubs[2]._id}`}>  <div className="relative  w-64  md:w-72 overflow-hidden transition-all duration-300 transform hover:scale-105">
                        <img className="rounded h-44 object-cover" src={clubs[2].bgImg} alt="" />
                        <div className="absolute w-8  bottom-3 left-3">
                            <img src={clubs[2].image} alt="" />
                        </div>
                    </div></Link>
                )}

                {clubs && clubs.length >= 4 && clubs[3] && (
                    <Link to={`/clubDetails?id=${clubs[3]._id}`}> <div className="relative  w-64 md:w-72 overflow-hidden transition-all duration-300 transform hover:scale-105 ">
                        <img className="rounded h-44 object-cover" src={clubs[3].bgImg} alt="" />
                        <div className="absolute w-8  bottom-3 left-3">
                            <img src={clubs[3].image} alt="" />
                        </div>
                    </div></Link>
                )}
            </div>
        </div>
    );
};

export default HomePageClubs;
