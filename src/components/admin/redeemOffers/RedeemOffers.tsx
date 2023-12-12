import { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import AddOfferModal from "./AddOfferModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewOffer, getAllOffers } from "../../../api/admin";
import RedeemOffersTable from "./RedeemOffersTable";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";

interface OfferI {
    _id: string;
    minPrice: string;
    discount: string;
    coins: string;
}


const RedeemOffers = () => {
    const [addModal, setAddModal] = useState(false);
    const { isLoading, data: offerData, refetch } = useQuery({ queryKey: ['loyaltyOffer'], queryFn: getAllOffers });

    let offers: OfferI[] = [];
    if (offerData && offerData.data) {
        offers = offerData.data;
    }

    //add offer

    const { status, mutate: newOfferMutate } = useMutation({
        mutationFn: addNewOffer,
        onSuccess: ((res) => {
            if (res) {
                setAddModal(!addModal);
                refetch();
                toast.success("New Offer Added!");
            }
        })
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-10">Derby Coin Redeem Offers</h1>
            <div className="mb-7">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white  flex items-center gap-2 rounded-lg"
                    onClick={() => setAddModal(!addModal)}>
                    <MdOutlineAddCircleOutline /> Add New Offer
                </button >
            </div>
            <RedeemOffersTable offers={offers} loading={isLoading} refetchFn={refetch} />

            {addModal && <AddOfferModal closeFn={() => setAddModal(!addModal)} addOfferFn={newOfferMutate} />}
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default RedeemOffers;
