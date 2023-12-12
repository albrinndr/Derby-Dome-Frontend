import React, { useState } from 'react';
import TableSkeleton from './TableSkeleton';
import TablePagination from '../../admin/allFixtures/TablePagination';

interface CouponI {
    _id: string;
    name: string;
    desc: string;
    discount: number;
    endingDate: string;
}

interface RedeemCouponTableI {
    isLoading: boolean;
    coupons: CouponI[];
}

const RedeemCouponTable: React.FC<RedeemCouponTableI> = ({ isLoading, coupons }) => {

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastCoupon = currentPage * itemsPerPage;
    const indexOfFirstCoupon = indexOfLastCoupon - itemsPerPage;
    const paginatedCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div className="overflow-x-auto shadow">
            <table className="min-w-full  leading-normal table-auto">
                <thead>
                    <tr >
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Coupon
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Discount
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Expiry
                        </th>
                    </tr>
                </thead>
                {!isLoading ?
                    <tbody>
                        {
                            coupons.length > 0 ?
                                <>
                                    {
                                        paginatedCoupons.map((coupon: CouponI) => (
                                            <tr key={coupon._id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <p className="text-gray-800 font-semibold whitespace-no-wrap">{coupon.name}</p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <p className="text-gray-800 font-semibold whitespace-no-wrap">{coupon.desc}</p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <p className="text-gray-800 font-semibold whitespace-no-wrap">
                                                        ₹{coupon.discount}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <p className="text-gray-800 font-semibold whitespace-no-wrap">
                                                        {new Date(coupon.endingDate).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </p>
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
            </table >
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
    );
};

export default RedeemCouponTable;
