import { useState } from "react";
import toast from "react-hot-toast";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const submitHandler = () => {
        if (!paymentMethod) {
            toast.error('Select a payment method');
            return;
        }
        console.log(paymentMethod);

    };
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Confirm your tickets and pay</h1>
            <div className=" w-full  mt-10  flex justify-center" >
                <div className=" border rounded shadow p-3 sm:p-5 " style={{ width: '60rem' }}>
                    <div>
                        <h1 className="sm:text-lg font-semibold border-b border-b-gray-400 border-dotted  mb-3">MATCH DETAILS</h1>
                        <div className="bg-slate-100 p-3">
                            <h1 className="text-xl font-semibold tracking-wider mb-2">Manchester United vs Alabama FC</h1>
                            <h1 className="mb-1">Time: 08:00 PM</h1>
                            <h1>Date: November 10 2023</h1>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h1 className="sm:text-lg font-semibold border-b border-b-gray-400 border-dotted  my-5">ORDER SUMMARY</h1>
                        <div className="">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-200">
                                        <th className="text-left py-2 px-4">ITEM</th>
                                        <th className="text-left py-2 px-4">QTY</th>
                                        <th className="text-right py-2 px-4">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-slate-100">
                                        <td className="py-4 px-4">
                                            <h1 className="text-lg">North Stand ( A1, A2, A5, A9, A10, A1, A2, A5, A9, A10 )</h1>
                                        </td>
                                        <td className="align-top py-4 px-6">5</td>
                                        <td className="align-top text-right py-4 px-4 font-bold">₹1500</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="mt-10">
                        <h1 className="sm:text-lg font-semibold border-b border-b-gray-400 border-dotted  my-5">PAYMENT</h1>
                        <div className="sm:flex gap-5 flex-wrap sm:gap-10 justify-center p-3">
                            <label className="flex items-center text-lg">
                                <input type="radio" name="paymentOption" className="form-radio h-4 w-4 text-indigo-600"
                                    onChange={() => setPaymentMethod('wallet')} />
                                <span className="ml-2 text-gray-700">Wallet ( Balance: ₹50000 )</span>
                            </label>
                            <label className="flex items-center text-lg">
                                <input type="radio" name="paymentOption" className="form-radio h-4 w-4 text-indigo-600"
                                    onChange={() => setPaymentMethod('online')} />
                                <span className="ml-2 text-gray-700">Online</span>
                            </label>
                        </div>
                        <div className="flex justify-center mt-3">
                            <button className="text-white w-64  px-4 py-2 rounded transition duration-300 bg-green-600 hover:bg-green-700"
                                onClick={submitHandler}>
                                <span>SUBMIT</span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Checkout;
