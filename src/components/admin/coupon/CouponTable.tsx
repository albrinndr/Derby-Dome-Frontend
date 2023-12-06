import React, { useState } from "react";
import CouponEdit from "./CouponEdit";
import TableSkeleton from "../allUsers/TableSkeleton";
import Loader from "../../common/Loader";
import { useMutation } from "@tanstack/react-query";
import { deleteCoupon } from "../../../api/admin";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../store/slices/modalSlice";
import DeleteConfirmationModal from "../../club/fixture/CancelConfirm";
import TablePagination from "../allUsers/TablePagination";

interface Coupon {
  _id: string;
  name: string,
  desc: string;
  minPrice: string;
  discount: string;
  startingDate: string;
  endingDate: string;
  users: string[];
}

interface CouponTableI {
  isLoading: boolean;
  couponData: Coupon[];
  refetchFn: () => void;
}

interface ModalState {
  modal: {
    showModal: boolean;
  };
}

const CouponTable: React.FC<CouponTableI> = ({ isLoading, couponData, refetchFn }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editCouponData, setEditCouponData] = useState<Coupon>();
  const [isEditLoading, setEditLoading] = useState(false);
  const [couponId, setCouponId] = useState('');

  const coupons = couponData && couponData.length ? couponData : [];

  //edit
  const editHandler = (val: Coupon) => {
    setEditCouponData(val);
    setShowEdit(!showEdit);
  };

  const editModalClose = () => {
    setShowEdit(!showEdit);
  };

  const editLoadingHandler = (val: boolean) => {
    setEditLoading(val);
  };


  //delete coupon
  const { status, mutate: deleteCouponMutate } = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: ((res) => {
      if (res) {
        toast.success('Coupon deleted!');
        refetchFn();
      }

    })
  });



  const { showModal } = useSelector((state: ModalState) => state.modal);
  const dispatch = useDispatch();

  const deleteBtnHandler = (id: string) => {
    setCouponId(id);
    dispatch(openModal());
  };

  const closeHandler = () => {
    dispatch(closeModal());
};

  //pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastFixture = currentPage * itemsPerPage;
  const indexOfFirstFixture = indexOfLastFixture - itemsPerPage;
  const paginatedCoupons = coupons.slice(indexOfFirstFixture, indexOfLastFixture);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10 mb-10">
      <h1 className="text-2xl font-semibold text-gray-800">All Coupons</h1>
      <div className="mt-5 inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal table-auto">
          <thead>
            <tr>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Coupon
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Desc
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Min. Price
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Discount
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Starting
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ending
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Edit
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          {isLoading === true ? <TableSkeleton /> :
            <tbody>
              {coupons.length >= 1 && paginatedCoupons.map((coupon: Coupon) => (
                <tr key={coupon._id}>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-800 font-semibold whitespace-no-wrap">
                          {coupon.name}
                        </p>
                      </div>
                    </div>
                  </td>


                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <p className="text-gray-800 font-semibold whitespace-no-wrap">{coupon.desc}</p>
                    </div>
                  </td>


                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-800 font-semibold whitespace-no-wrap">
                      {coupon.minPrice}
                    </p>
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-800 font-semibold whitespace-no-wrap">
                      {coupon.discount}
                    </p>
                  </td>


                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-800 font-semibold whitespace-no-wrap">
                      {new Date(coupon.startingDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </td>


                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-800 font-semibold whitespace-no-wrap">
                      {new Date(coupon.endingDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </td>


                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
                      onClick={() => editHandler(coupon)} >
                      <span aria-hidden
                        className="absolute inset-0 bg-blue-200 opacity-70 rounded-full"></span>
                      <button className="relative"
                      >Edit</button>
                    </span>
                  </td>


                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                      onClick={() => deleteBtnHandler(coupon._id)} >
                      <span aria-hidden
                        className="absolute inset-0 bg-red-200 hover:bg-red-300 opacity-50 rounded-full"></span>
                      <button className="relative"
                      >Delete</button>
                    </span>
                  </td>


                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <p className="text-gray-800 font-semibold whitespace-no-wrap text-center w-full">No data available</p>
                    </div>
                  </td>
                </tr>
              )}


            </tbody>
          }

        </table>
        {coupons.length > 0 && <div
          className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <div className="inline-flex mt-2 xs:mt-0">
            <TablePagination
              itemsPerPage={itemsPerPage}
              totalItems={coupons.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>}
      </div>
      {showEdit && editCouponData && <CouponEdit closeFn={editModalClose} coupon={editCouponData} refetchFn={refetchFn} loaderFn={editLoadingHandler} />}
      {isEditLoading || status === 'pending' && <Loader />}
      {showModal && <DeleteConfirmationModal confirmFn={deleteCouponMutate} id={couponId} closeFn={closeHandler}/>}
    </div>
  );
};

export default CouponTable;
