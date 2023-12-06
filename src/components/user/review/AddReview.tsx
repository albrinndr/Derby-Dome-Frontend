import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Rating, Typography } from '@mui/material';
import { useState } from 'react';
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUpdateReview, userReview } from "../../../api/user";
import Loader from "../../common/Loader";

interface AddReviewI {
    modalFn: () => void;
    refetchFn: () => void;
    addBtnFn: () => void;
}

const AddReview: React.FC<AddReviewI> = ({ modalFn, refetchFn, addBtnFn }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState('');
    const [showBtn, setShowBtn] = useState(false);
    const { isLoading, data: userReviewData } = useQuery({ queryKey: ['singleReview'], queryFn: userReview });

    useEffect(() => {
        if (!isLoading && userReviewData && userReviewData.data) {
            if (userReviewData.data.purchased) setShowBtn(true);
        }
    }, [isLoading, userReviewData]);

    const { status, mutate: addReviewMutate } = useMutation({
        mutationFn: addUpdateReview,
        onSuccess: ((res) => {
            if (res) {
                refetchFn();
                toast.success('Review added!');
                modalFn();
                addBtnFn();
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
        addReviewMutate(data);
    };

    return (
        <div className="bg-black bg-opacity-40 text-gray-700
         h-screen w-screen grid p-2 place-content-center fixed top-0 left-0">
            <div className=" py-5 pb-10 bg-white rounded-lg">
                <div className="flex justify-end text-2xl pe-5">
                    <p className="cursor-pointer" onClick={() => modalFn()}><IoCloseOutline /></p>
                </div>
                <div className="px-10">
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
                        {showBtn && <button className="sm:px-4 sm:py-2 sm:w-32 px-2 py-1 bg-green-500 hover:bg-green-600 rounded text-white  mt-3"
                            onClick={submitHandler}>Submit</button>}
                        {!showBtn && <h1 className="text-sm w-44 sm:w-fit mt-2">You need to purchase ticket to add review</h1>}
                    </div>
                </div>
            </div>
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default AddReview;
