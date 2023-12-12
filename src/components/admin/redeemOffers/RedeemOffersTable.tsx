import { GiCrownCoin } from "react-icons/gi";
import React, { useState } from 'react';
import TableSkeleton from "./TableSkeleton";
import { useMutation } from "@tanstack/react-query";
import { deleteOffer, editOffer } from "../../../api/admin";
import toast from "react-hot-toast";
import Loader from "../../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import ConfirmationModal from "../../common/ConfirmationModal";
import EditOfferModal from "./EditOfferModal";
import TablePagination from "../allFixtures/TablePagination";

interface OfferI {
    _id: string;
    minPrice: string;
    discount: string;
    coins: string;
}
interface OffersI {
    offers: OfferI[];
    loading: boolean;
    refetchFn: () => void;
}

interface ModalState {
    modal: {
        showModal: boolean;
    };
}

const RedeemOffersTable: React.FC<OffersI> = ({ offers, loading, refetchFn }) => {

    const { status: deleteStatus, mutate: deleteMutate } = useMutation({
        mutationFn: deleteOffer,
        onSuccess: ((res) => {
            if (res) {
                refetchFn();
                toast.success("OfferDeleted");
            }
        })
    });

    const [offerId, setOfferId] = useState('');

    const { showModal } = useSelector((state: ModalState) => state.modal);
    const dispatch = useDispatch();

    const modalHandler = (id: string) => {
        setOfferId(id);
        dispatch(openModal());
    };


    //edit offer    
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState<OfferI>();

    const { status: editStatus, mutate: editMutate } = useMutation({
        mutationFn: editOffer,
        onSuccess: ((res) => {
            if (res) {
                refetchFn();
                setShowEdit(!showEdit);
                toast.success("Offer Edited!");
            }
        })
    });

    const editHandler = (offer: OfferI) => {
        setEditData(offer);
        setShowEdit(true);
    };


    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastOffer = currentPage * itemsPerPage;
    const indexOfFirstOffer = indexOfLastOffer - itemsPerPage;
    const paginatedOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="overflow-x-auto shadow">
            <table className="min-w-full leading-normal table-auto">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Coins
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Discount
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Min Pur
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Edit
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Delete
                        </th>
                    </tr>
                </thead>
                {
                    !loading ?
                        <tbody>
                            {
                                offers.length > 0 ?
                                    <>
                                        {
                                            paginatedOffers.map((offer: OfferI) => (
                                                <tr key={offer._id}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <p className="text-gray-800 font-semibold whitespace-no-wrap flex items-center justify-center">
                                                            <span className="text-yellow-500 text-xl"><GiCrownCoin /></span>
                                                            <span className="ml-1">{offer.coins}</span>
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <p className="text-gray-800 font-semibold whitespace-no-wrap">
                                                            ₹{offer.discount}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <p className="text-gray-800 font-semibold whitespace-no-wrap">
                                                            ₹{offer.minPrice}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <button className="px-3 py-1 font-semibold text-blue-900 bg-blue-200 rounded-full"
                                                            onClick={() => editHandler(offer)}>
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <button className="px-3 py-1 font-semibold text-red-900 bg-red-200 rounded-full"
                                                            onClick={() => modalHandler(offer._id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </> :
                                    <tr>
                                        <td colSpan={8} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex">
                                                <p className="text-gray-800 font-semibold whitespace-no-wrap text-center w-full">No offers available</p>
                                            </div>
                                        </td>
                                    </tr>
                            }
                        </tbody> : <TableSkeleton />
                }
            </table>
            {offers.length > 0 && <div
                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

                <div className="inline-flex mt-2 xs:mt-0">
                    <TablePagination
                        itemsPerPage={itemsPerPage}
                        totalItems={offers.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>}
            {showEdit && editData && <EditOfferModal closeFn={() => setShowEdit(false)} editOfferFn={editMutate} offer={editData} />}
            {deleteStatus === 'pending' && <Loader />}
            {editStatus === 'pending' && <Loader />}
            {showModal && <ConfirmationModal confirmFn={deleteMutate} id={offerId} />}
        </div>
    );
};

export default RedeemOffersTable;
