import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Rating, Typography } from '@mui/material';
import { useState } from 'react';
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUpdateReview, userReview } from "../../../api/user";
import Loader from "../../common/Loader";
import EditReviewSkeleton from "./EditReviewSkeleton";

interface EditReviewI {
    modalFn: () => void;
    refetchFn: () => void;
}

const EditReview: React.FC<EditReviewI> = ({ modalFn, refetchFn }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState('');
    const { isLoading, data: userReviewData } = useQuery({ queryKey: ['userReview'], queryFn: userReview });

    useEffect(() => {
        if (!isLoading && userReviewData && userReviewData.data) {
            console.log(userReviewData.data);

            setRating(userReviewData.data.review.rating);
            setReview(userReviewData.data.review.review);
        }
    }, [isLoading, userReviewData]);

    const { status, mutate: editReviewMutate } = useMutation({
        mutationFn: addUpdateReview,
        onSuccess: ((res) => {
            if (res) {
                refetchFn();
                toast.success('Review added!');
                modalFn();
            }
        })
    });

    const submitHandler = () => {
        if (!rating) {
            toast.error('Select rating');
            return;
        } else if (review.trim().length === 0) {
            toast.error('Add your review');
            return;
        }
        const data = {
            rating,
            review
        };
        editReviewMutate(data);
    };

    return (
        <div className="bg-black bg-opacity-40 text-gray-700
         h-screen w-screen grid p-2 place-content-center fixed top-0 left-0">
            <div className="px-10 py-5 pb-10 bg-white rounded-lg">
                <div className="flex justify-end text-2xl">
                    <p className="cursor-pointer" onClick={() => modalFn()}><IoCloseOutline /></p>
                </div>
                {!isLoading ?
                    <>
                        <div className="sm:flex gap-2">
                            <Typography component="legend">Select Rating: </Typography>
                            <Rating name="no-value" value={rating} onChange={(_, newValue) => {
                                setRating(newValue);
                            }} />
                        </div>
                        <div className="mt-3">
                            <p>Write your review: </p>
                            <textarea className="border p-2  outline-none mt-2 w-52 sm:w-96" rows={5} placeholder="Your review.."
                                value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                        </div>
                        <div>
                            <button className="sm:px-4 sm:py-2 sm:w-32 px-2 py-1 bg-green-500 hover:bg-green-600 rounded text-white  mt-3"
                                onClick={submitHandler}>Update</button>
                        </div>
                    </>
                    :
                    <EditReviewSkeleton />
                }
            </div>

            {status === 'pending' && <Loader />}
        </div>
    );
};

export default EditReview;
