import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface Coupon {
    name: string;
    desc: string;
    endingDate: string;
}

interface ShowCouponsI {
    closeFn: () => void;
    coupons: Coupon[];
}

const ShowCoupons: React.FC<ShowCouponsI> = ({ closeFn, coupons }) => {
    const [copied, setCopied] = useState(false);
    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000); // Hide "Copied" popup after 1 second
    };
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
        return formattedDate;
    };


    return (
        <div className="fixed top-0 bg-black bg-opacity-10 w-screen h-screen grid place-content-center">
            <div className="w-fit bg-white py-2 rounded-lg">
                <div className="flex justify-end pr-4">
                    <button onClick={() => closeFn()} className="text-gray-700 text-3xl">
                        <IoCloseOutline />
                    </button>
                </div>
                <div className="px-10 pt-2 pb-5 relative">
                    {coupons.map((coupon: Coupon, i) => (
                        <div className="container mx-auto mb-3 " key={i}>
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg shadow-md relative">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="border-dashed border text-white px-2 py-1 rounded-l">
                                        {coupon.name}
                                    </span>
                                    <span
                                        className="border border-white bg-white text-purple-600 px-2 py-1 rounded-r cursor-pointer"
                                        onClick={() => copyCode(coupon.name)}
                                    >
                                        Copy Code
                                    </span>
                                </div>
                                <h3 className="text-sm">{coupon.desc}</h3>
                                <p className="text-sm">Valid Till: {formatDate(coupon.endingDate)}</p>
                            </div>
                        </div>
                    ))}

                    {copied && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800  bg-opacity-60 text-white py-2 px-4 rounded-md shadow-lg">
                            Copied!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowCoupons;
