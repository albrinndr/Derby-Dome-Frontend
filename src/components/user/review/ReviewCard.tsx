import { Rating } from "@mui/material";
import React from "react";

interface ReviewCardI {
    review: {
        userId: {
            name: string;
            profilePic: string;
        };
        rating: number;
        review: string;
        _id: string;
    };
}
const ReviewCard: React.FC<ReviewCardI> = ({ review }) => {
    return (
        <div className="bg-white px-5 py-4 rounded mb-5">
            <div className="flex gap-3">
                <div className="">
                    <img src={review.userId.profilePic} alt=""
                        className="w-10 h-auto rounded-full" />
                </div>
                <div className="text-gray-800">
                    <div className="flex items-center gap-1">
                        <h1 className="font-semibold text-lg">{review.userId.name}</h1>
                        <Rating name="read-only" value={review.rating} readOnly />
                    </div>
                    <p className="text-xs">March 23 2023</p>
                </div>
            </div>
            <div className="mt-2 text-gray-700 text-sm ">
                <p>{review.review}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
