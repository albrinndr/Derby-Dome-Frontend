import { Button, Menu, MenuItem, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";
import { useMutation, useQuery } from "@tanstack/react-query";
import { allReviews, deleteReview } from "../../../api/user";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import EditReview from "./EditReview";
import ReviewSkeleton from "./ReviewSkeleton";
import FixturePagination from "../fixture/FixturePagination";

interface ReviewI {
    userId: {
        name: string;
        profilePic: string;
    };
    rating: number;
    review: string;
    _id: string;
}

const Reviews = () => {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModalBtn, setAddModalBtn] = useState(false);
    const [editModalBtn, setEditModalBtn] = useState(false);

    const userLoggedInDataString = localStorage.getItem('uLoggedIn');
    const userLoggedInData = userLoggedInDataString ? JSON.parse(userLoggedInDataString) : null;

    const { isLoading, data: reviews, refetch } = useQuery({ queryKey: ['reviews'], queryFn: allReviews });

    useEffect(() => {
        if (!isLoading && reviews && reviews.data && userLoggedInData != null) {
            for (let i = 0; i < reviews.data.length; i++) {
                if (reviews.data[i].userId._id === userLoggedInData.id) {
                    setEditModalBtn(true);
                    return;
                }
            }
            if (!editModalBtn) setAddModalBtn(true);
        }
    }, [isLoading]);

    //add new review
    const addModalHandler = () => {
        setAddModal(!addModal);
    };

    const addModalBtnHandler = () => {
        setAddModalBtn(false);
        setEditModalBtn(true);
    };

    //edit review
    const editModalHandler = () => {
        setEditModal(!editModal);
        setAnchorEl(null);
    };


    //delete review
    const { status, mutate: deleteReviewMutate } = useMutation({
        mutationFn: deleteReview,
        onSuccess: ((res) => {
            if (res) {
                setEditModalBtn(false);
                setAddModalBtn(true);
                toast.success('Review deleted');
                refetch();
            }
        })
    });
    const deleteBtnHandler = () => {
        setAnchorEl(null);
        deleteReviewMutate();
    };

    //option button config
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const buttonStyle = {
        backgroundColor: '#718096',
        color: 'white   '
    };

    //data
    let allReviewsData = [];
    if (reviews && reviews.data && reviews.data.length) {
        allReviewsData = reviews.data;
    }


    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastReview = currentPage * itemsPerPage;
    const indexOfFirstReview = indexOfLastReview - itemsPerPage;
    const currentReviews = allReviewsData.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div>
            <div className="flex justify-between gap-2">
                <div className="p-2 w-fit bg-gray-100 text-center">
                    <h1 className="text-gray-900 tracking-wider text-md sm:text-xl font-bold px-2 sm:px-4 sm:w-60">ALL REVIEWS</h1>
                </div>
                <div>
                    {addModalBtn &&
                        <div className="flex justify-end">
                            <button className="text-white px-3 py-2 bg-green-500 hover:bg-green-600 rounded" onClick={addModalHandler}>ADD REVIEW</button>
                        </div>}


                    {editModalBtn &&
                        <div className="flex justify-end">
                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={buttonStyle}
                            >
                                Options
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={editModalHandler}>Edit</MenuItem>
                                <MenuItem onClick={deleteBtnHandler}>Delete</MenuItem>
                            </Menu>
                        </div>
                    }
                </div>

            </div>

            <div className="mt-10">
                {!isLoading ?
                    <>
                        {currentReviews.length > 0 ?
                            <>
                                {currentReviews && currentReviews.map((review: ReviewI) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </>
                            :
                            <div className="text-white text-xl h-50 grid place-content-center pt-20">
                                <h1>No reviews available</h1>
                            </div>
                        }
                    </>
                    :
                    <>
                        <ReviewSkeleton />
                        <ReviewSkeleton />
                    </>
                }

            </div>
            {addModal && <AddReview modalFn={addModalHandler} refetchFn={refetch} addBtnFn={addModalBtnHandler} />}
            {status === 'pending' && <Loader />}
            {editModal && <EditReview modalFn={editModalHandler} refetchFn={refetch} />}

            {allReviewsData.length > itemsPerPage && <FixturePagination
                itemsPerPage={itemsPerPage}
                totalItems={allReviewsData.length}
                paginate={paginate}
                currentPage={currentPage}
            />}
        </div>
    );
};

export default Reviews;
