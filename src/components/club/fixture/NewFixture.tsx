import React, { useState, useEffect } from "react";
import CommonHeader from "../headers/CommonHeader";
import Calendar from "react-calendar";
import { getFixtureDateContent, newFixture } from "../../../api/fixture";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingScreen from "../../common/LoadingScreen";
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PK = 'pk_test_51OA5R7SG8cuZuFqKRSKfynnuGfD7Qg99WtVfYlHoalU9GANT4nd0X30UaEKlc1v5tfbaEUXL1KTOvAO7m4HhqOlM00dJNGR0ek';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Time {
    time: string;
    price: string;
}

interface Club {
    _id: string;
    name: string;
}

const NewFixture = () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 10));
    const [date, setDate] = useState<Value>();
    // const [first, setFirst] = useState(true);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedTimePrice, setSelectedTimePrice] = useState('');
    const [selectedAwayTeam, setSelectedAwayTeam] = useState('');
    const [awayTeamName, setAwayTeamName] = useState('');
    const [checked, setChecked] = useState(false);
    const [matchTitle, setMatchTitle] = useState('Friendly Match');
    const [teamXI, setTeamXI] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [times, setTimes] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [image, setImage] = useState<File | null>(null);

    const { status, mutate } = useMutation({
        mutationFn: getFixtureDateContent,
        onSuccess: (res) => {
            if (res && res.data) {
                if (res.data.times.length > 0) {
                    setClubs(res.data.clubs);
                    setTimes(res.data.times);
                    setTeamXI(res.data.team);
                    setShowForm(true);
                }
            }
        }
    });

    // const firstRef = useRef(true);
    // const secondRef = useRef(true);
    useEffect(() => {
        if (date) {
            // const d = date?.toLocaleString();
            const newDate = new Date(`${date}`);
            const changedDate = new Date(newDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000); // Adding 5 hours and 30 minutes
            // if (firstRef.current) {
            //     mutate(newDate);
            //     firstRef.current = false;
            //     return;
            // }
            newDate.setDate(newDate.getDate() + 1);
            mutate(changedDate);
        }
    }, [date, mutate]);


    const handleOptionChange = (time: string, price: string) => {
        setSelectedTime(time);
        setSelectedTimePrice(price);
    };

    //Fixture submit mutate function

    const { status: submitStatus, mutate: formSubmitMutate } = useMutation({
        mutationFn: newFixture,
        onSuccess: async (res) => {
            const stripe = await loadStripe(STRIPE_PK);
            if (res && res.data && stripe) {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.stripeSessionId
                });
                if (result?.error) {
                    const msg = result.error;
                    console.log(msg);
                }
                // toast.success('Fixture Scheduled');
                // navigate('/club/fixture');
            }
            
        }
    });

    const submitHandler = async () => {
        if (!selectedTime) {
            toast.error('Select a time slot');
            return;
        } else if (matchTitle.trim().length < 1) {
            toast.error('Enter match title');
            return;
        } else if (!selectedAwayTeam && !checked) {
            toast.error('Select an away team');
            return;
        } else if (checked && awayTeamName.trim().length <= 1) {
            toast.error('Enter away team name');
            return;
        } else if (image === null) {
            toast.error('Select matchday poster');
            return;
        } else {
            const fixtureForm = new FormData();
            if (checked) {
                fixtureForm.append('awayTeam', awayTeamName);
            } else {
                fixtureForm.append('awayTeamId', selectedAwayTeam);
            }
            if (date) {
                // const d = date?.toLocaleString();
                const newDate = new Date(`${date}`);
                const changedDate = new Date(newDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000); // Adding 5 hours and 30 minutes
                // newDate.setDate(newDate.getDate() + 1);
                fixtureForm.append('date', changedDate.toISOString());
                // if (secondRef.current) {
                // secondRef.current = false;
                // } else {
                //     fixtureForm.append('date', newDate.toISOString());
                // }
            }
            fixtureForm.append('title', matchTitle);
            fixtureForm.append('time', selectedTime);
            fixtureForm.append('image', image);
            if (selectedTimePrice) {
                fixtureForm.append('price', selectedTimePrice);
            }
            formSubmitMutate(fixtureForm);
            // const response = await newFixture(fixtureForm);
            // if (response) {
            //     console.log(response.data);
            //     toast.success('Fixture Scheduled');
            // }
        }
    };

    //UI
    const tileDisabled = ({ date, view }: { date: Date; view: string; }) => {
        if (view === 'month') {
            const timeDiff = date.getTime() - futureDate.getTime();
            const diffDays = timeDiff / (1000 * 3600 * 24);
            return diffDays < -1 || diffDays > 6;
        }
        return false;
    };

    const isLoading = status === "pending";

    return (
        <div>
            {submitStatus === "pending" && <LoadingScreen size={35} />}
            <CommonHeader />
            <div className="p-4 md:p-14 flex flex-col lg:flex-row gap-20 justify-center items-center lg:items-start">
                <div className="custom-calendar">
                    <Calendar onChange={setDate}
                        value={date}
                        className="text-center"
                        tileDisabled={tileDisabled}
                    />

                </div>
                <div className="purchaseForm    ">
                    {!date ?
                        <div className="md:mt-20">
                            <h1 className="text-xl">Please select a date</h1>
                        </div>
                        :
                        <>
                            {isLoading ?
                                <div className="md:mt-20">
                                    <h1>Loading....</h1>
                                </div>
                                :
                                <>
                                    {showForm ?
                                        <>
                                            <div className="">
                                                {!teamXI && <div className="flex bg-white shadow-md w-fit p-2 items-center mb-4 gap-4">
                                                    <p>Complete you team first </p>
                                                    <Link to="/club/team" className="bg-green-500 p-1 text-white rounded">Go to team</Link>
                                                </div>}
                                                <div>
                                                    <label htmlFor="">Select time: </label>
                                                    <div className="sm:flex gap-5 mt-2">
                                                        {times.map((time: Time) => (
                                                            <button
                                                                key={time.time}
                                                                className={`bg-white border ${time.time === selectedTime ? 'bg-green-800 text-white' : 'bg-gray-200 hover:bg-blue-50 text-gray-700'
                                                                    } px-8 py-2 rounded-lg`}
                                                                onClick={() => handleOptionChange(time.time, time.price)}
                                                            >
                                                                {time.time}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <label htmlFor="">Enter match title</label><br />
                                                    <input type="text" className="pl-2 h-10 mt-2 w-64 border-2 rounded focus:outline-slate-400"
                                                        value={matchTitle}
                                                        onChange={(e) => setMatchTitle(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mt-6">
                                                    {!checked ?
                                                        <>
                                                            <label htmlFor="">Select away team: </label><br />
                                                            <select name="" id="" className="border w-60 h-10 rounded mt-2 focus:outline-slate-400"
                                                                value={selectedAwayTeam}
                                                                onChange={(e) => setSelectedAwayTeam(e.target.value)}
                                                            >
                                                                <option value="" className="text-center">---select---</option>
                                                                {clubs.map((club: Club) => (
                                                                    <option key={club._id} value={club._id}>{club.name}</option>

                                                                ))}
                                                            </select>
                                                        </>
                                                        :
                                                        <>
                                                            <label htmlFor="">Enter away team name: </label><br />
                                                            <input type="text" className="pl-2 h-10 mt-2 w-64 border-2 rounded focus:outline-slate-400"
                                                                value={awayTeamName}
                                                                onChange={(e) => setAwayTeamName(e.target.value)}
                                                            />
                                                        </>
                                                    }
                                                    <div className="flex items-center mt-2">
                                                        <input
                                                            id="noneOfAbove"
                                                            type="checkbox"
                                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                            onClick={() => (
                                                                setSelectedAwayTeam(''),
                                                                setChecked(!checked)
                                                            )}

                                                        />
                                                        <label htmlFor="noneOfAbove" className="ml-2 block text-sm text-gray-900">
                                                            None of the above
                                                        </label>
                                                    </div>
                                                    <div className="w-36 mt-4" >
                                                        {image && <img src={URL.createObjectURL(image)} alt="" />}
                                                    </div>
                                                    <div className="mt-8">
                                                        <label className="p-2 px-4 bg-gray-300 rounded-sm cursor-pointer hover:bg-gray-400">
                                                            <input
                                                                className="hidden"
                                                                type="file"
                                                                name='file'
                                                                accept="image/*"
                                                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                                                            />
                                                            {image ? image.name.substring(0, 17) + (image.name.length > 17 ? "..." : "") : 'Upload match poster'}
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center mt-8">
                                                        <label className="h-10 bg-rose-500 text-white text-center p-2">Coupon:</label>
                                                        <input type="text" placeholder="Enter your coupon code" className="p-2 h-10 focus:outline-slate-300 border-2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-8">
                                                <h1 className="text-lg">Total: ₹ {selectedTimePrice}</h1>
                                            </div>
                                            <div>
                                                <button className={`p-2 w-80 rounded font-semibold mt-4 ${!teamXI ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                                                    } text-white`}
                                                    onClick={submitHandler} disabled={!teamXI}
                                                >Submit</button>
                                            </div>
                                        </> :
                                        <div>
                                            <h1>No slot available in this date</h1>
                                        </div>
                                    }
                                </>
                            }
                        </>

                    }




                </div>
            </div>
        </div>
    );
};

export default NewFixture;
