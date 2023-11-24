import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addNewTicket, validateCoupon } from "../../../api/user";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
const STRIPE_PK = 'pk_test_51OA5R7SG8cuZuFqKRSKfynnuGfD7Qg99WtVfYlHoalU9GANT4nd0X30UaEKlc1v5tfbaEUXL1KTOvAO7m4HhqOlM00dJNGR0ek';

interface Checkout {
    data: {
        cart: {
            createdAt: string;
            price: number;
            section: string;
            stand: string;
            ticketCount: number;
            seats: [{ row: string; userSeats: number[]; }];
        };
        fixture: {
            _id: string;
            awayTeam: string;
            clubId: { name: string; };
            date: string;
            time: string;
        };
        coupons: {
            name: string;
        }[];
    };
    refetchFn: () => void;
    wallet: number;
    userRefetch: () => void;
    showCoupon: () => void;
}

const Checkout: React.FC<Checkout> = ({ data, refetchFn, wallet, userRefetch, showCoupon }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [timer, setTimer] = useState('00:00');
    const [remainingTime, setRemainingTime] = useState(0);




    const createdAt = new Date(data.cart.createdAt);
    const currentDate = new Date();

    const differenceInSeconds: number = Math.floor((currentDate.getTime() - createdAt.getTime()) / 1000);
    const initialRemainingTime: number = 600 - differenceInSeconds;

    useEffect(() => {
        setRemainingTime(initialRemainingTime);

        if (initialRemainingTime <= 0) {
            refetchFn();
            return;
        }

        const countdown = setInterval(() => {
            const minutes: number = Math.floor(remainingTime / 60);
            const seconds: number = remainingTime % 60;

            setTimer(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

            if (remainingTime <= 0) {
                clearInterval(countdown);
                refetchFn();
            } else {
                setRemainingTime((prevTime) => prevTime - 1);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [initialRemainingTime, remainingTime, refetchFn]);



    const userSeats = data.cart.seats;
    const formattedArray = userSeats.flatMap(({ row, userSeats }) =>
        userSeats.map(seat => `${row}${seat}`)
    );
    const formattedSeats = formattedArray.join(', ');

    const dateString = data.fixture.date;
    const date = new Date(dateString);
    const monthAndDay = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
    const year = date.getUTCFullYear();

    const originalTime: string = data.fixture.time;
    const [hours, minutes] = originalTime.split(":");
    const formattedTime = new Date(0, 0, 0, parseInt(hours, 10), parseInt(minutes, 10)).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    //----------coupon Handler ----------------------------
    const [checkCoupon, setCheckCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState('');
    const [disableCoupon, setDisableCoupon] = useState(false);

    const [couponDiscount, setCouponDiscount] = useState(0);

    const { status, mutate: applyCouponMutate } = useMutation({
        mutationFn: validateCoupon,
        onSuccess: ((res) => {
            if (res && res.data) {
                toast.success('Coupon Applied');
                setCouponApplied(checkCoupon);
                setDisableCoupon(true);
                setCouponDiscount(res.data.discount);
                data.cart.price = data.cart.price - res.data.discount;
            }
        })
    });

    const applyCoupon = () => {
        if (checkCoupon.trim().length < 1) {
            toast.error('Enter coupon code');
            return;
        }
        const couponData = {
            coupon: checkCoupon.toUpperCase(),
            price: data.cart.price
        };
        applyCouponMutate(couponData);

    };

    const removeCoupon = () => {
        setCouponApplied('');
        setCheckCoupon('');
        setDisableCoupon(false);
        data.cart.price = data.cart.price + couponDiscount;
        if (paymentMethod === "wallet") setPaymentMethod('');
    };

    //------------------payment and submitting---------------------------
    const navigate = useNavigate();

    const { mutate: ticketMutate } = useMutation({
        mutationFn: addNewTicket,
        onSuccess: async (res) => {
            const stripe = await loadStripe(STRIPE_PK);
            if (res && res.data && stripe && paymentMethod === 'online') {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.stripeSessionId
                });
                if (result?.error) {
                    const msg = result.error;
                    console.log(msg);
                }
            } else if (res && res.data && paymentMethod === 'wallet') {
                toast.success('Payment Success');
                userRefetch();
                navigate('/paymentSuccess');
            }
        }
    });

    const submitHandler = () => {
        if (!paymentMethod) {
            toast.error('Select a payment method');
            return;
        }
        const ticketData = {
            fixtureId: data.fixture._id,
            stand: data.cart.stand,
            section: data.cart.section,
            ticketCount: data.cart.ticketCount,
            seats: data.cart.seats,
            price: data.cart.price,
            paymentType: paymentMethod,
            coupon: couponApplied ? couponApplied : false
        };
        ticketMutate(ticketData);

    };

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Confirm your tickets and pay</h1>
            <div className=" w-full  mt-10  flex justify-center" >
                <div className=" border rounded shadow p-3 sm:p-5 " style={{ width: '60rem' }}>
                    <div >
                        <div className="border-b border-b-gray-400 border-dotted  mb-3 flex justify-between items-center py-2">
                            <h1 className="sm:text-lg font-semibold ">MATCH DETAILS</h1>
                            <h1 className="sm:text-lg border py-2 px-4 w-fit text-rose-600">{timer}</h1>
                        </div>
                        <div className="bg-slate-100 p-3">
                            <h1 className="text-xl font-semibold tracking-wider mb-2">{data.fixture.clubId.name} vs {data.fixture.awayTeam}</h1>
                            <h1 className="mb-1">Time: {formattedTime}</h1>
                            <h1>Date: {monthAndDay} {year}</h1>
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
                                            <h1 className="text-lg">{data.cart.stand} Stand ( {formattedSeats} )</h1>
                                        </td>
                                        <td className="align-top py-4 px-6">{data.cart.ticketCount}</td>
                                        <td className="align-top text-right py-4 px-4 font-bold">₹{data.cart.price}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="sm:text-lg font-semibold border-b border-b-gray-400 border-dotted  my-5">PAYMENT</h1>
                        <div className="mt-10  mb-5 flex flex-col items-center">
                            <div className="flex justify-center items-center">
                                <div className="flex justify-center">
                                    <input id="coupon" type="text" className="border uppercase outline-none pl-2 py-2" placeholder="Coupon code" readOnly={disableCoupon}
                                        value={checkCoupon} onChange={(e) => setCheckCoupon(e.target.value)} />
                                </div>
                                <div>
                                    {!disableCoupon && <button className="bg-rose-500 px-4 py-2 hover:bg-rose-500 text-white"
                                        onClick={applyCoupon}>Apply</button>}
                                    {disableCoupon && <button className="bg-red-400 px-2 py-2 hover:bg-red-500 text-white" onClick={removeCoupon}>Remove</button>}
                                </div>
                            </div>
                            {data.coupons && data.coupons.length > 0 && <div onClick={() => showCoupon()} className="cursor-pointer flex justify-start mt-2">
                                <p className="text-blue-700 font-semibold">find coupons</p>
                            </div>}
                        </div>
                        <div className="sm:flex gap-5 flex-wrap sm:gap-10 justify-center p-3">
                            <label className="flex items-center text-lg">
                                <input type="radio" name="paymentOption" className="form-radio h-4 w-4 text-indigo-600"
                                    onChange={() => setPaymentMethod('wallet')}
                                    disabled={wallet < data.cart.price} />
                                <span className="ml-2 text-gray-700">Wallet ( Balance: ₹{wallet} )</span>
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
            {status === 'pending' && <Loader />}
        </div>

    );
};

export default Checkout;
