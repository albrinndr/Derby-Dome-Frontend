import React, { useState } from "react";
import CouponEdit from "./CouponEdit";

const CouponTable = () => {
  const [showEdit, setShowEdit] = useState(false);

  const closeEditHandler = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
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
          <tbody>
            <tr className="">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      INDIA20
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <p className="text-gray-900 whitespace-no-wrap">₹250 OFF on next purchase</p>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  5000
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  10-08-2023
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  05-01-2024
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-blue-900 leading-tight"
                  onClick={closeEditHandler} >
                  <span aria-hidden
                    className="absolute inset-0 bg-blue-200 opacity-70 rounded-full"></span>
                  <button className="relative"
                  >Edit</button>
                </span>


              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                >
                  <span aria-hidden
                    className="absolute inset-0 bg-red-200 hover:bg-red-300 opacity-50 rounded-full"></span>
                  <button className="relative"
                  >Delete</button>
                </span>


              </td>
            </tr>

          </tbody>

        </table>
        {/* <div
          className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

          <div className="inline-flex mt-2 xs:mt-0">
            <TablePagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredUsers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div> */}
      </div>
      {showEdit && <CouponEdit closeFn={closeEditHandler} />}
    </div>
  );
};

export default CouponTable;
